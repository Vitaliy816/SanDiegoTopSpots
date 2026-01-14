$(document).ready(function () {
    const $tbody = $("#spots-tbody");
    const $status = $("#status");

    $.getJSON("data.json").done(function (spots) {
        $status.text(`Loaded ${spots.length} spots.`);

        spots.forEach(function (spot) {
            const lat = spot.location[0];
            const lng = spot.location[1];
            const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

            const $tr = $("<tr>").addClass("hover:bg-white/5 transition");

            const $name = $("<td>")
                .addClass("px-4 py-4 align-top font-medium text-sky-100")
                .text(spot.name);

            const $description = $("<td>")
                .addClass("px-4 py-4 align-top text-sky-300 max-w-2xl")
                .text(spot.description);

            const $linkCell = $("<td>").addClass("px-4 py-4 align-center whitespace-nowrap");

            const $button = $("<a>")
                .attr("href", mapsUrl)
                .attr("target", "_blank")
                .attr("rel", "noopener noreferrer")
                .addClass("inline-flex items-center justify-center rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-sky-950 " +
                    "shadow-lg shadow-sky-500/20 transition hover:bg-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-500/30 active:scale-[0.99]")
                .text("Open in Google Maps");

            $linkCell.append($button);
            $tr.append($name, $description, $linkCell);
            $tbody.append($tr);
        });
    }).fail(function () {
        $status.text("Failed to load data.json")
            .removeClass("text-sky-400")
            .addClass("text-red-300");
    })
});