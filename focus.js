let countdown;
let totalSeconds = 0;
let remainingSeconds = 0;

let selectedPlant = null;
let sessionLabel = "";

let records =
JSON.parse(
localStorage.getItem("focusRecords") || "[]"
);

function updateDisplay() {

    let hrs =
    Math.floor(remainingSeconds / 3600);

    let mins =
    Math.floor((remainingSeconds % 3600) / 60);

    let secs =
    remainingSeconds % 60;

    document.getElementById("timerDisplay").textContent =
        String(hrs).padStart(2, "0") +
        ":" +
        String(mins).padStart(2, "0") +
        ":" +
        String(secs).padStart(2, "0");
}

function startFocus() {

    const hrs =
    parseInt(
        document.getElementById("hours").value
    );

    const mins =
    parseInt(
        document.getElementById("minutes").value
    );

    if (hrs === 0 && mins === 0) {

        alert(
            "⏰ Please select a focus duration first."
        );

        return;
    }

    if (!selectedPlant) {

        alert(
            "🌱 Please select a plant first."
        );

        return;
    }

    totalSeconds =
        (hrs * 3600) +
        (mins * 60);

    remainingSeconds =
        totalSeconds;

    updateDisplay();

    if (countdown) {
        clearInterval(countdown);
    }

    countdown = setInterval(() => {

        remainingSeconds--;

        updateDisplay();

        if (remainingSeconds <= 0) {

            clearInterval(countdown);

            document.getElementById(
                "plantDisplay"
            ).textContent = "🌳";

            alert(
                "🎉 Great job! Your plant has grown!"
            );

            saveRecord(
                hrs,
                mins,
                selectedPlant,
                sessionLabel,
                true
            );
        }

    }, 1000);
}

function quitFocus() {

    if (!countdown) {

        alert(
            "No focus session is running."
        );

        return;
    }

    if (
        confirm(
            "Are you sure you want to quit?"
        )
    ) {

        clearInterval(countdown);

        saveRecord(
            0,
            0,
            selectedPlant,
            sessionLabel,
            false
        );

        alert(
            "❌ Focus session ended."
        );
    }
}

/* ---------- Plant Modal ---------- */

function openPlantModal() {

    document.getElementById(
        "plantModal"
    ).style.display = "flex";
}

function closePlantModal() {

    document.getElementById(
        "plantModal"
    ).style.display = "none";
}

function choosePlant(plant) {

    const label =
    document
    .getElementById("sessionLabel")
    .value
    .trim();

    if (label === "") {

        alert(
            "Please enter a session label."
        );

        return;
    }

    sessionLabel = label;

    selectedPlant = plant;

    document.getElementById(
        "plantDisplay"
    ).textContent =
    plant.split(" ")[0];

    closePlantModal();
}

/* ---------- Records ---------- */

function saveRecord(
    h,
    m,
    plant,
    label,
    completed
) {

    records.push({

        date:
        new Date().toLocaleString(),

        plant:
        plant,

        label:
        label,

        duration:
        h + "h " + m + "m",

        status:
        completed
        ? "✅ Completed"
        : "❌ Quit"
    });

    localStorage.setItem(
        "focusRecords",
        JSON.stringify(records)
    );
}

function openRecords() {

    const list =
    document.getElementById(
        "recordsList"
    );

    list.innerHTML = "";

    if (records.length === 0) {

        list.innerHTML =
        "<li>No records yet.</li>";

    } else {

        records.forEach(record => {

            const li =
            document.createElement("li");

            li.innerHTML = `
                <strong>${record.label}</strong><br>
                ${record.plant}<br>
                ${record.duration}<br>
                ${record.status}<br>
                <small>${record.date}</small>
                <hr>
            `;

            list.appendChild(li);

        });
    }

    document.getElementById(
        "recordsModal"
    ).style.display = "flex";
}

function closeRecords() {

    document.getElementById(
        "recordsModal"
    ).style.display = "none";
}
