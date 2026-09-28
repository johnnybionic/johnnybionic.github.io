/*
**** alpha testing script ****
This script processes event listings on the page and removes any events that are in the past based on their datetime attribute. It compares the datetime of each event with the current date and time, and if the event is in the past, it removes it from the DOM.
*/
(function (globalObject) {
    function processEventListings(referenceDate, documentObject) {
        const currentDate = referenceDate instanceof Date ? referenceDate : new Date();
        const doc = documentObject || (typeof document !== 'undefined' ? document : null);

        if (!doc || typeof doc.querySelectorAll !== 'function') {
            return 0;
        }

        let removedCount = 0;

        Array.from(doc.querySelectorAll('.event-listing')).forEach(eventListing => {
            const timeElement = eventListing.querySelector('time');
            if (!timeElement) {
                return;
            }

            let datetime;
            try {
                datetime = new Date(timeElement.getAttribute('datetime'));
            } catch (error) {
                return;
            }

            if (Number.isNaN(datetime.getTime())) {
                return;
            }

            if (datetime < currentDate) {
                console.log("Removing past event: ");
                console.log(eventListing);
                eventListing.remove();
                removedCount += 1;
            }
        });

        return removedCount;
    }

    function initEventListings(referenceDate) {
        return processEventListings(referenceDate, typeof document !== 'undefined' ? document : null);
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            processEventListings,
            initEventListings
        };
    }

    const root = globalObject || globalThis;
    root.processEventListings = processEventListings;
    root.initEventListings = initEventListings;

    if (typeof document !== 'undefined') {
        initEventListings();
    }
}(typeof globalThis !== 'undefined' ? globalThis : this));

