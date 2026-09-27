/*
**** alpha testing script ****
This script processes event listings on the page and removes any events that are in the past based on their datetime attribute. It compares the datetime of each event with the current date and time, and if the event is in the past, it removes it from the DOM.
*/
var today = new Date();
console.log('Today:', today);
const eventListings = document.querySelectorAll('.event-listing');
eventListings.forEach(eventListing => {
    const timeElement = eventListing.querySelector('time');
    if (timeElement) {
        console.log('Time element:', timeElement);

        let datetime;
        try {
            datetime = new Date(timeElement.getAttribute('datetime'));
        } catch (e) {
            console.error('Invalid datetime attribute:', timeElement.getAttribute('datetime'));
            return;
        }

        console.log('Datetime:', datetime);
        // handle date-only events  
        if (isNaN(datetime.getTime())) {
            console.error('Invalid datetime format:', timeElement.getAttribute('datetime'));
            return;
        }

        if (datetime < today) {
            console.log('Event is in the past, removing:', eventListing);
            eventListing.remove();
        }
        else {
            console.log('Event is in the future, keeping:', eventListing);
        }
    }
});

