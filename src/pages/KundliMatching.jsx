
import { useState } from "react";
import {
    getKundli,
    matchKundli,
    checkMangalDosha,
    Observer
} from "@prisri/jyotish";
import {
    Heart,
    User,
    CalendarDays,
    Clock,
    MapPin,
    Sparkles
} from "lucide-react";

export default function KundliMatching() {
    const [boy, setBoy] = useState({
        name: "",
        date: "",
        time: "",
        place: "",
        latitude: "",
        longitude: ""
    });

    const [girl, setGirl] = useState({
        name: "",
        date: "",
        time: "",
        place: "",
        latitude: "",
        longitude: ""
    });

    const [matchResult, setMatchResult] = useState(null);
    const [calculationError, setCalculationError] = useState("");

    function handleChange(e, person, setPerson) {
        setPerson({
            ...person,
            [e.target.name]: e.target.value
        });
    }


    function handleSubmit(e) {
        e.preventDefault();

        try {
            setCalculationError("");
            setMatchResult(null);

            const boyDate = new Date(
                `${boy.date}T${boy.time}:00+05:30`
            );

            const girlDate = new Date(
                `${girl.date}T${girl.time}:00+05:30`
            );

            const boyObserver = new Observer(
                Number(boy.latitude),
                Number(boy.longitude),
                0
            );

            const girlObserver = new Observer(
                Number(girl.latitude),
                Number(girl.longitude),
                0
            );

            const boyKundli = getKundli(
                boyDate,
                boyObserver,
                {
                    ayanamsa: "lahiri",
                    houseSystem: "whole_sign"
                }
            );

            const girlKundli = getKundli(
                girlDate,
                girlObserver,
                {
                    ayanamsa: "lahiri",
                    houseSystem: "whole_sign"
                }
            );

            const match = matchKundli(
                boyKundli,
                girlKundli
            );

            const boyDosha = checkMangalDosha(boyKundli);
            const girlDosha = checkMangalDosha(girlKundli);

            const result = {
                match,
                boyDosha,
                girlDosha
            };

            setMatchResult(result);

            sessionStorage.setItem(
                "kundliMatchingDetails",
                JSON.stringify({ boy, girl })
            );

            console.log("Kundli Matching Result:", result);

            console.log("MATCH OBJECT:", JSON.stringify(match, null, 2));
            console.log("KOOTAS:", JSON.stringify(match.ashtakoot.kootas, null, 2));
            alert(
                `Matching Complete!\nTotal Score: ${match.ashtakoot.totalScore}/36\nVerdict: ${match.verdict}`
            );
        } catch (error) {
            console.error(error);
            setCalculationError(
                error.message || "Kundli matching calculation failed."
            );
        }
    }


    return (
        <div className="kundli-page">
            <div className="kundli-heading">
                <Heart size={30} />
                <h1>Kundli Matching</h1>
                <p>
                    विवाह के लिए लड़का और लड़की की जन्म जानकारी भरें।
                </p>
                <h3>अष्टकूट गुण मिलान – 36 गुण</h3>
            </div>

            <form className="kundli-form" onSubmit={handleSubmit}>


                {calculationError && (
                    <p style={{ color: "red" }}>
                        Error: {calculationError}
                    </p>
                )}

                {matchResult && (
                    <div className="kundli-form">
                        <h2>❤️ Kundli Matching Result</h2>


                        <div className="match-verdict">
                            <h3>📊 Ashtakoot Guna Matching Details</h3>

                            <div className="koota-table-wrapper">
                                <table className="koota-table">
                                    <thead>
                                        <tr>
                                            <th>Koota</th>
                                            <th>Boy</th>
                                            <th>Girl</th>
                                            <th>Score</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {matchResult.match.ashtakoot.kootas.map((koota, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <strong>{koota.name}</strong>
                                                    <small>{koota.area}</small>
                                                </td>
                                                <td>{koota.boy || "-"}</td>
                                                <td>{koota.girl || "-"}</td>
                                                <td>
                                                    {koota.score}/{koota.maxScore}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <h3>❤️ Guna Matching Result</h3>

                            <h2>
                                {matchResult.match.ashtakoot.totalScore}/36
                            </h2>

                            <p>
                                {matchResult.match.ashtakoot.totalScore >= 18
                                    ? "Good Guna Score"
                                    : "Low Guna Score"}
                            </p>

                            <div className="verdict-status">
                                <strong>Matching Verdict:</strong>                                <p>{matchResult.match.verdict}</p>
                            </div>
                        </div>

                        <h3 className="dosha-heading">💙 Boy's Mangal Dosha</h3>
                        <div className="dosha-info">
                            <p>
                                <strong>Status:</strong>{" "}
                                {matchResult.boyDosha?.hasDosha ? "Manglik" : "Non-Manglik"}
                            </p>
                            <p>
                                <strong>Severity:</strong>{" "}
                                {matchResult.boyDosha?.isHigh ? "High" : "Normal / None"}
                            </p>
                            <p>
                                <strong>Details:</strong>{" "}
                                {matchResult.boyDosha?.description}
                            </p>
                        </div>

                        <h3 className="dosha-heading">💗 Girl's Mangal Dosha</h3>
                        <div className="dosha-info">
                            <p>
                                <strong>Status:</strong>{" "}
                                {matchResult.girlDosha?.hasDosha ? "Manglik" : "Non-Manglik"}
                            </p>
                            <p>
                                <strong>Severity:</strong>{" "}
                                {matchResult.girlDosha?.isHigh ? "High" : "Normal / None"}
                            </p>
                            <p>
                                <strong>Details:</strong>{" "}
                                {matchResult.girlDosha?.description}
                            </p>
                        </div>
                    </div>
                )}

                <h2>💙 Boy's Birth Details</h2>

                <label><User size={17} /> Full Name</label>
                <input
                    name="name"
                    value={boy.name}
                    onChange={(e) => handleChange(e, boy, setBoy)}
                    placeholder="Enter boy's name"
                    required
                />

                <label><CalendarDays size={17} /> Date of Birth</label>
                <input
                    type="date"
                    name="date"
                    value={boy.date}
                    onChange={(e) => handleChange(e, boy, setBoy)}
                    required
                />

                <label><Clock size={17} /> Time of Birth</label>
                <input
                    type="time"
                    name="time"
                    value={boy.time}
                    onChange={(e) => handleChange(e, boy, setBoy)}
                    required
                />

                <label><MapPin size={17} /> Birth Place</label>
                <input
                    name="place"
                    value={boy.place}
                    onChange={(e) => handleChange(e, boy, setBoy)}
                    placeholder="Enter birth city"
                    required
                />

                <label>Latitude</label>
                <input
                    type="number"
                    step="any"
                    name="latitude"
                    value={boy.latitude}
                    onChange={(e) => handleChange(e, boy, setBoy)}
                    placeholder="Example: 25.2138"
                    required
                />

                <label>Longitude</label>
                <input
                    type="number"
                    step="any"
                    name="longitude"
                    value={boy.longitude}
                    onChange={(e) => handleChange(e, boy, setBoy)}
                    placeholder="Example: 84.9870"
                    required
                />

                <hr />

                <h2>💗 Girl's Birth Details</h2>

                <label><User size={17} /> Full Name</label>
                <input
                    name="name"
                    value={girl.name}
                    onChange={(e) => handleChange(e, girl, setGirl)}
                    placeholder="Enter girl's name"
                    required
                />

                <label><CalendarDays size={17} /> Date of Birth</label>
                <input
                    type="date"
                    name="date"
                    value={girl.date}
                    onChange={(e) => handleChange(e, girl, setGirl)}
                    required
                />

                <label><Clock size={17} /> Time of Birth</label>
                <input
                    type="time"
                    name="time"
                    value={girl.time}
                    onChange={(e) => handleChange(e, girl, setGirl)}
                    required
                />

                <label><MapPin size={17} /> Birth Place</label>
                <input
                    name="place"
                    value={girl.place}
                    onChange={(e) => handleChange(e, girl, setGirl)}
                    placeholder="Enter birth city"
                    required
                />

                <label>Latitude</label>
                <input
                    type="number"
                    step="any"
                    name="latitude"
                    value={girl.latitude}
                    onChange={(e) => handleChange(e, girl, setGirl)}
                    placeholder="Example: 25.2138"
                    required
                />

                <label>Longitude</label>
                <input
                    type="number"
                    step="any"
                    name="longitude"
                    value={girl.longitude}
                    onChange={(e) => handleChange(e, girl, setGirl)}
                    placeholder="Example: 84.9870"
                    required
                />

                <button type="submit">
                    <Sparkles size={18} />
                    Save Birth Details
                </button>
            </form>
        </div>
    );
}
