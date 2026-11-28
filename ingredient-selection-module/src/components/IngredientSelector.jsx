
import React, { useState, useEffect } from "react";
import { ingredients, categories } from "../data/ingredients";

export default function IngredientSelector() {

    const [allIngredients, setAllIngredients] = useState(() => {
        const saved = localStorage.getItem("customIngredients");
        return [...ingredients, ...(saved ? JSON.parse(saved) : [])];
    });

    const [selected, setSelected] = useState(() => {
        const saved = localStorage.getItem("selectedIngredients");
        return saved ? JSON.parse(saved) : [];
    });

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [custom, setCustom] = useState("");

    useEffect(() => {
        localStorage.setItem(
            "selectedIngredients",
            JSON.stringify(selected)
        );
    }, [selected]);

    useEffect(() => {
        localStorage.setItem(
            "customIngredients",
            JSON.stringify(allIngredients.filter(item => item.isCustom))
        );
    }, [allIngredients]);

    const toggleIngredient = (name) => {
        setSelected(prev =>
            prev.includes(name)
                ? prev.filter(item => item !== name)
                : [...prev, name]
        );
    };

    const removeIngredient = (name) => {
        setSelected(prev =>
            prev.filter(item => item !== name)
        );
    };

    const clearAll = () => {
        setSelected([]);
    };

    const addCustomIngredient = (e) => {
        e.preventDefault();

        const name = custom.trim();

        if (!name) return;

        const existing = allIngredients.find(
            item => item.name.toLowerCase() === name.toLowerCase()
        );

        const finalName = existing ? existing.name : name;

        if (!existing) {
            setAllIngredients(prev => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    name: name,
                    category: "Others",
                    emoji: "🌿",
                    isCustom: true
                }
            ]);
        }

        setSelected(prev =>
            prev.includes(finalName)
                ? prev
                : [...prev, finalName]
        );

        setCustom("");
    };

    const filteredIngredients = allIngredients.filter(item => {
        const matchesCategory =
            category === "All" || item.category === category;

        const matchesSearch =
            item.name.toLowerCase().includes(
                search.trim().toLowerCase()
            );

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="container">

            <h1>What's in Your Kitchen?</h1>
            <p>Select the ingredients available at home.</p>

            <div className="layout">

                <aside className="pantry">

                    <h2>My Kitchen Pantry</h2>

                    <p>{selected.length} ingredients selected</p>

                    <button className="clear-btn" onClick={clearAll}>
                        Clear All
                    </button>

                    {selected.length === 0 && (
                        <p>Your pantry is empty.</p>
                    )}

                    <div className="selected-list">
                        {selected.map(name => (
                            <button
                                key={name}
                                className="chip"
                                onClick={() => removeIngredient(name)}
                            >
                                {name} ×
                            </button>
                        ))}
                    </div>

                    <button
                        className="recipe-btn"
                        disabled={selected.length === 0}
                        onClick={() => {
                            console.log("Selected ingredients:", selected);
                            alert("Selected: " + selected.join(", "));
                        }}
                    >
                        Find Matching Recipes
                    </button>

                </aside>

                <main className="browser">

                    <input
                        className="search"
                        type="text"
                        placeholder="Search ingredients..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />

                    <form
                        className="custom-form"
                        onSubmit={addCustomIngredient}
                    >
                        <input
                            type="text"
                            placeholder="Add custom ingredient..."
                            value={custom}
                            onChange={e => setCustom(e.target.value)}
                        />
                        <button type="submit">Add</button>
                    </form>

                    <div className="categories">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={
                                    category === cat ? "active" : ""
                                }
                                onClick={() => setCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="ingredient-grid">

                        {filteredIngredients.map(item => (
                            <button
                                key={item.id}
                                aria-pressed={selected.includes(item.name)}
                                className={
                                    selected.includes(item.name)
                                        ? "ingredient selected"
                                        : "ingredient"
                                }
                                onClick={() => toggleIngredient(item.name)}
                            >
                                <span className="emoji">
                                    {item.emoji}
                                </span>

                                <strong>{item.name}</strong>

                                <small>{item.category}</small>

                                {selected.includes(item.name) && (
                                    <span>✓ Selected</span>
                                )}
                            </button>
                        ))}

                    </div>

                    {filteredIngredients.length === 0 && (
                        <p>No ingredients found.</p>
                    )}

                </main>

            </div>

        </div>
    );
}
