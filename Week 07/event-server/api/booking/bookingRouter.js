const { Router } = require("express");
const bookingService = require("./bookingService");
const eventService = require("../event/eventService");

const bookingRouter = Router({ mergeParams: true });

bookingRouter.post("/", (req, res) => {
  const eventId = parseInt(req.params.id);
  if (!eventService.getEvent(eventId)) {
    return res.status(404).send({ message: `Event with id ${eventId} was not found!` });
  }

  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    return res.status(400).send({ message: "Missing firstName or lastName!" });
  }
  if (typeof firstName !== "string" || firstName.trim() === "") {
    return res.status(400).send({ message: "Invalid firstName property!" });
  }
  if (typeof lastName !== "string" || lastName.trim() === "") {
    return res.status(400).send({ message: "Invalid lastName property!" });
  }

  const bookingId = bookingService.getCurrentId();
  const newBooking = { id: bookingId, firstName, lastName, eventId };
  bookingService.setBooking(bookingId, newBooking);
  res.status(201).send(newBooking);
});

bookingRouter.get("/:bookingId", (req, res) => {
  const eventId = parseInt(req.params.id);
  if (!eventService.getEvent(eventId)) {
    return res.status(404).send({ message: `Event with id ${eventId} was not found!` });
  }

  const bookingId = parseInt(req.params.bookingId);
  const booking = bookingService.getBooking(bookingId);

  if (!booking) {
    return res.status(404).send({ message: `Booking with id ${bookingId} was not found!` });
  }

  if (booking.eventId !== eventId) {
    return res
      .status(404)
      .send({ message: `Event with id ${bookingId} was not found for event with id ${eventId}!` });
  }

  res.status(200).send(booking);
});

bookingRouter.get("/", (req, res) => {
  const eventId = parseInt(req.params.id);
  if (!eventService.getEvent(eventId)) {
    return res.status(404).send({ message: `Event with id ${eventId} was not found!` });
  }
  const bookings = bookingService.getAllBookingsForEvent(eventId);
  res.status(200).send(bookings);
});

bookingRouter.delete("/:bookingId", (req, res) => {
  const eventId = parseInt(req.params.id);
  if (!eventService.getEvent(eventId)) {
    return res.status(404).send({ message: `Event with id ${eventId} was not found!` });
  }

  const bookingId = parseInt(req.params.bookingId);
  const booking = bookingService.getBooking(bookingId);

  if (!booking) {
    return res.status(404).send({ message: `Booking with id ${bookingId} was not found!` });
  }

  if (booking.eventId !== eventId) {
    return res
      .status(404)
      .send({ message: `Event with id ${bookingId} was not found for event with id ${eventId}!` });
  }

  bookingService.removeBooking(bookingId);
  res.status(200).send({ message: `Successfully deleted booking with id ${bookingId}!` });
});

module.exports = bookingRouter;
