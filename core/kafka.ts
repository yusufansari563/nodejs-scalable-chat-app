import { Kafka, Producer } from "kafkajs";
import prismaClient from "./prisma";

let producer: Producer | null = null;

const kafka = new Kafka({
    clientId: "app",
    brokers: ["localhost:9092"],
});

async function createProducer() {
    if (producer) return producer;

    const _producer = kafka.producer();
    await _producer.connect();
    producer = _producer;
    return producer;
}

export async function produceMessage(message: string) {
    const producer = await createProducer();
    await producer.send({
        messages: [{ key: `message-${Date.now()}`, value: message }],
        topic: "MESSAGES",
    });
    return true;
}

let manyMsg:any[] = [];

export async function startMessageConsumer() {
    console.log("Consumer is running..");
    const consumer = kafka.consumer({ groupId: "default" });
    await consumer.connect();
    await consumer.subscribe({ topic: "MESSAGES", fromBeginning: true });

    await consumer.run({
        autoCommit: true,
        eachMessage: async ({ message, pause }) => {
            if (!message.value) return;
            console.log(`New Message Recv..`);
            try {
                if (manyMsg.length < 10) {
                    manyMsg.push({
                        text: message.value?.toString(),
                    });
                    console.log(manyMsg,"if");
                    
                } else{
                    await prismaClient.message.createMany({
                        data: [...manyMsg],
                    });
                    manyMsg = [];
                    console.log(manyMsg,"else");
                }
            } catch (err) {
                console.log("Something is wrong");
                pause();
                setTimeout(() => {
                    consumer.resume([{ topic: "MESSAGES" }]);
                }, 60 * 1000);
            }
        },
    });
}
export default kafka;
