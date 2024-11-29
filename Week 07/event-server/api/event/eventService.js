const _events = new Map();
let _currentId = 1;

function getCurrentId() {
  return _currentId++;
}

function getEvent(id) {
  return _events.get(id);
}

function setEvent(id, event) {
  return _events.set(id, event);
}

function getAllEvents() {
  return Array.from(_events.values());
}

function deleteEvent(id) {
  return _events.delete(id);
}

module.exports = { getEvent, setEvent, getAllEvents, deleteEvent, getCurrentId };
