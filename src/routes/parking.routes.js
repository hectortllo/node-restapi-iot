import { Router } from "express";
const router = Router();

// Database connection
import { connect } from "../database";
import { ObjectID } from 'mongodb';

router.get('/', async (req, res) => {
  const db = await connect();
  const result = await db.collection('parking').find({}).toArray();
  res.json(result);
});

router.post('/', async (req, res) => {
  const db = await connect();
  const positionParking = {
    position: req.body[0].position,
    record: [
      {
        taken: false,
        date: Date("$history.ModDate")
      }
    ]
  };
  const result = await db.collection('parking').insertOne(positionParking);
  res.json(result.ops[0]);

});

router.get('/:id', async(req, res) => {
  const { id } = req.params;
  const db = await connect();
  const result = await db.collection('parking').findOne({ _id: ObjectID(id) });
  res.json(result);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const db = await connect();
  const result = await db.collection('parking').deleteOne({ _id: ObjectID(id) });
  res.json({
    message: `Parking ${id} deleted`,
    result
  });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const db = await connect();
  await db.collection('parking').updateOne({ _id: ObjectID(id)}, 
    { 
      $push: {
        "record": {
          "taken": req.body.record[0].taken,
          "date": Date("$history.ModDate")
        }
      }
    }
  );
  res.json({
    message: `Parking spot ${req.body.position} updated`
  })
});

export default router;