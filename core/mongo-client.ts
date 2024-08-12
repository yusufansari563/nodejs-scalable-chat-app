import { connect } from "mongoose";

async function init() {
  return connect("mongodb://mongoadmin:secret@localhost:27017");
}

export default init;
