
import { useState } from "react";
import {
    User,
    CalendarDays,
    Clock,
    MapPin,
    Sparkles,
} from "lucide-react";
import { getKundli, Observer } from "@prisri/jyotish";


export default function Kundli() {
    const [form, setForm] = useState({
        name: "",
        gender: "",
        date: "",
        time: "",
        place: "",
        latitude: "",
        longitude: "",
    });

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        sessionStorage.setItem(
            "kundliDetails",
            JSON.stringify(form)
        );

        window.location.href = "/kundli-result";
    }

    return (
        <div className="kundli-page">
            <div className="kundli-heading">
                <Sparkles size={24} />
                <h1>Free Kundli</h1>
                <p>
                    अपनी जन्म जानकारी भरें और अपनी कुंडली की शुरुआत करें।
                </p>
            </div>

            <form className="kundli-form" onSubmit={handleSubmit}>
                <h2>Birth Details</h2>

                <label>
                    <User size={17} /> Full Name
                </label>
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                />

                <label>Gender</label>
                <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <label>
                    <CalendarDays size={17} /> Date of Birth
                </label>
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                />

                <label>
                    <Clock size={17} /> Time of Birth
                </label>
                <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    required
                />

                <label>
                    <MapPin size={17} /> Birth Place
                </label>
                <input
                    name="place"
                    value={form.place}
                    onChange={handleChange}
                    placeholder="Enter city or birth place"
                    required
                />

                <label>Latitude</label>
                <input
                    type="number"
                    step="any"
                    name="latitude"
                    value={form.latitude}
                    onChange={handleChange}
                    placeholder="Example: 25.2138"
                    required
                />

                <label>Longitude</label>
                <input
                    type="number"
                    step="any"
                    name="longitude"
                    value={form.longitude}
                    onChange={handleChange}
                    placeholder="Example: 84.9870"
                    required
                />

                <button type="submit">
                    Generate Free Kundli
                </button>
            </form>
        </div>
    );
}
