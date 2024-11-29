const _bookings = new Map();
let _currentId = 1;

function getCurrentId() {
  return _currentId++;
}

function getBooking(id) {
  return _bookings.get(id);
}

function getAllBookingsForEvent(eventId) {
  return Array.from(_bookings.values()).filter((booking) => booking.eventId === eventId);
}

function setBooking(id, booking) {
  return _bookings.set(id, booking);
}

function removeBooking(id) {
  return _bookings.delete(id);
}

module.exports = { getBooking, getAllBookingsForEvent, setBooking, removeBooking, getCurrentId };
