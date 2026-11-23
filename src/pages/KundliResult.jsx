
import {
    Sparkles,
    User,
    CalendarDays,
    Clock,
    MapPin,
    ArrowLeft
} from "lucide-react";

import { getKundli, Observer } from "@prisri/jyotish";

export default function KundliResult() {
    const details = JSON.parse(
        sessionStorage.getItem("kundliDetails") || "null"
    );

    let kundli = null;
    let calculationError = "";

    try {
        if (details) {
            const birthDate = new Date(
                `${details.date}T${details.time}:00+05:30`
            );

            const observer = new Observer(
                Number(details.latitude),
                Number(details.longitude),
                0
            );

            kundli = getKundli(birthDate, observer, {
                ayanamsa: "lahiri",
                houseSystem: "whole_sign",
                includeReferenceCharts: true,
            });
        }
    } catch (error) {
        calculationError = error.message;
        console.error("Kundli calculation error:", error);
    }

    if (!details) {
        return (
            <div className="kundli-page">
                <div className="kundli-heading">
                    <Sparkles size={30} />
                    <h1>Kundli Result</h1>
                    <p>अभी जन्म की जानकारी उपलब्ध नहीं है।</p>

                    <a href="/kundli" className="primary-btn">
                        Create Kundli
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="kundli-page">

            <div className="kundli-heading">
                <Sparkles size={30} />
                <h1>Your Kundli Details</h1>
                <p>आपकी जन्म जानकारी</p>
            </div>

            <div className="kundli-form">

                <h2>Birth Information</h2>

                <p><User size={17} /> Name: {details.name}</p>
                <p>Gender: {details.gender}</p>
                <p>
                    <CalendarDays size={17} />
                    Date: {details.date}
                </p>
                <p>
                    <Clock size={17} />
                    Time: {details.time}
                </p>
                <p>
                    <MapPin size={17} />
                    Place: {details.place}
                </p>

                {calculationError && (
                    <p style={{ color: "red" }}>
                        Kundli calculation error: {calculationError}
                    </p>
                )}

                {kundli && (
                    <div className="kundli-details">

                        <h2>🌟 Your Kundli Analysis</h2>


                        <div className="kundli-overview">
                            <div className="overview-card">
                                <span>☀️</span>
                                <h4>Ascendant</h4>
                                <h3>{kundli.ascendant.rashiName}</h3>
                                <p>लग्न राशि</p>
                            </div>

                            <div className="overview-card">
                                <span>🌙</span>
                                <h4>Moon Sign</h4>
                                <h3>{kundli.planets.Moon.rashiName}</h3>
                                <p>चंद्र राशि</p>
                            </div>

                            <div className="overview-card">
                                <span>✨</span>
                                <h4>Nakshatra</h4>
                                <h3>{kundli.planets.Moon.nakshatra}</h3>
                                <p>जन्म नक्षत्र</p>
                            </div>
                        </div>



                        <h3>🔯 North Indian Kundli Chart</h3>

                        <div className="north-chart-wrapper">
                            <svg
                                viewBox="0 0 400 400"
                                className="north-diamond-chart"
                            >
                                <rect
                                    x="5"
                                    y="5"
                                    width="390"
                                    height="390"
                                    fill="#fff8e9"
                                    stroke="#c99a25"
                                    strokeWidth="9"
                                />

                                <path
                                    d="M5 5 L395 395 M395 5 L5 395
               M200 5 L395 200 L200 395 L5 200 Z"
                                    fill="none"
                                    stroke="#b82020"
                                    strokeWidth="2.5"
                                />

                                {[
                                    [200, 55], [100, 45], [45, 120],
                                    [100, 200], [45, 280], [100, 355],
                                    [200, 345], [300, 355], [355, 280],
                                    [300, 200], [355, 120], [300, 45]
                                ].map(([x, y], index) => {
                                    const house = kundli.houses?.[index];

                                    return (
                                        <g key={index}>
                                            <text
                                                x={x}
                                                y={y}
                                                textAnchor="middle"
                                                fill="#791414"
                                                fontSize="13"
                                                fontWeight="bold"
                                            >
                                                {`House ${index + 1}`}
                                            </text>

                                            <text
                                                x={x}
                                                y={y + 17}
                                                textAnchor="middle"
                                                fill="#791414"
                                                fontSize="13"
                                                fontWeight="bold"
                                            >
                                                {house?.rashiName || house?.rashi || ""}
                                            </text>

                                            <text
                                                x={x}
                                                y={y + 34}
                                                textAnchor="middle"
                                                fill="#791414"
                                                fontSize="10"
                                            >
                                                {house?.planets?.join(", ") || ""}
                                            </text>
                                        </g>
                                    );
                                })}
                            </svg>
                        </div>


                        <h3>🪐 Vimshottari Mahadasha</h3>

                        <div className="dasha-list">
                            {kundli.dasha?.mahadashas?.map((dasha, index) => {
                                const now = new Date();
                                const start = new Date(dasha.startTime);
                                const end = new Date(dasha.endTime);
                                const isCurrent = now >= start && now < end;

                                return (
                                    <div className="dasha-card" key={index}>
                                        <h4>
                                            {dasha.planet}
                                            {isCurrent ? " (Current)" : ""}
                                        </h4>

                                        <p>
                                            Start: {start.toLocaleDateString("en-IN")}
                                        </p>
                                        <p>
                                            End: {end.toLocaleDateString("en-IN")}
                                        </p>

                                        <h5>Antardasha</h5>

                                        {dasha.antars?.map((antar, i) => (
                                            <p key={i}>
                                                {antar.planet}:{" "}
                                                {new Date(antar.startTime).toLocaleDateString("en-IN")}
                                                {" – "}
                                                {new Date(antar.endTime).toLocaleDateString("en-IN")}
                                            </p>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>


                        <h3>
                            🪐 Planetary Positions (ग्रहों की स्थिति)
                        </h3>

                        <div className="planet-table-wrapper">
                            <table className="planet-table">
                                <thead>
                                    <tr>
                                        <th>Planet</th>
                                        <th>Rashi</th>
                                        <th>Degree</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {Object.entries(kundli.planets).map(
                                        ([planet, data]) => (
                                            <tr key={planet}>
                                                <td>{planet}</td>
                                                <td>{data.rashiName}</td>
                                                <td>
                                                    {data.degree}° {data.minute}'
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <h3>
                            🏠 12 Houses (जन्म कुंडली के भाव)
                        </h3>

                        <div className="house-list">
                            {Array.isArray(kundli.houses) &&
                                kundli.houses.map((house, index) => (
                                    <div
                                        className="house-card"
                                        key={index}
                                    >
                                        <h4>
                                            House {house.house ?? index + 1}
                                        </h4>

                                        <p>
                                            <strong>Rashi:</strong>{" "}
                                            {[
                                                "",
                                                "Aries",
                                                "Taurus",
                                                "Gemini",
                                                "Cancer",
                                                "Leo",
                                                "Virgo",
                                                "Libra",
                                                "Scorpio",
                                                "Sagittarius",
                                                "Capricorn",
                                                "Aquarius",
                                                "Pisces"
                                            ][Number(house.rashi)] || house.rashiName || "Not Available"}
                                        </p>

                                        <p>
                                            <strong>Planets:</strong>{" "}
                                            {Array.isArray(house.planets) &&
                                                house.planets.length > 0
                                                ? house.planets.join(", ")
                                                : "No planets"}
                                        </p>
                                    </div>
                                ))}
                        </div>

                    </div>
                )}

                <p
                    style={{
                        color: "#d9b66e",
                        marginTop: "25px"
                    }}
                >
                    आपकी जन्म जानकारी के आधार पर ज्योतिषीय गणना की गई है।
                    यह पारंपरिक ज्योतिष पर आधारित जानकारी है।
                </p>

                <button
                    type="button"
                    className="primary-btn"
                    onClick={() => window.print()}
                >
                    📥 Download Kundli PDF
                </button>

                <a href="/kundli" className="primary-btn">
                    <ArrowLeft size={17} />
                    Back to Kundli Form
                </a>

            </div>
        </div>
    );
}
