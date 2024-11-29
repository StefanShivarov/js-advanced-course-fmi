const { Router } = require("express");
const eventService = require("./eventService");
const bookingRouter = require("../booking/bookingRouter");

const eventRouter = Router();

eventRouter.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const event = eventService.getEvent(id);
  if (!event) {
    res.status(404).send({ message: `Event with id ${id} was not found!` });
  }
  res.status(200).send(event);
});

eventRouter.get("/", (req, res) => {
  const events = eventService.getAllEvents();
  res.send(events);
});

eventRouter.post("/", (req, res) => {
  const { name, capacity } = req.body;

  if (!name || !capacity) {
    return res.status(400).send({ message: "Missing name or capacity!" });
  }
  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).send({ message: "Invalid or missing name!" });
  }
  if (typeof capacity !== "number" || capacity <= 0) {
    return res.status(400).send({ message: "Invalid or missing capacity!" });
  }

  const eventId = eventService.getCurrentId();
  const event = { id: eventId, name, capacity };
  eventService.setEvent(eventId, event);
  res.status(201).send(event);
});

eventRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = eventService.deleteEvent(id);
  if (!deleted) {
    return res.status(404).send({ message: `Event with id ${id} was not found!` });
  }
  res.status(200).send({ message: `Successfully deleted event with id ${id}!` });
});

eventRouter.use("/:id/booking", bookingRouter);

module.exports = eventRouter;
