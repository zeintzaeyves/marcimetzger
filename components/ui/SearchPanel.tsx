"use client";

import { useId, useState } from "react";
import { buttonClasses } from "./Button";

// DEMO ONLY: there is no MLS/IDX feed connected, so this never returns listings.
// Every control is real and works; "Search Properties" only echoes the chosen filters.

const locations = ["All areas", "Pahrump, NV"];
const propertyTypes = ["Any", "Residential", "Commercial", "Land"];
const sortOptions = ["Newest", "Price low–high", "Price high–low"];
const bedroomOptions = ["Any", "1+", "2+", "3+", "4+"];
const bathOptions = ["Any", "1+", "2+", "3+"];

// Demo price range, taken from the Figma reference ($5,000 – $10,300 selected).
const PRICE_MIN = 5000;
const PRICE_MAX = 15000;
const PRICE_STEP = 100;
const DEFAULT_PRICE: [number, number] = [5000, 10300];

const defaults = {
  location: locations[0],
  type: propertyTypes[0],
  sort: sortOptions[0],
  beds: bedroomOptions[0],
  baths: bathOptions[0],
};

const formatPrice = (value: number) => `$${value.toLocaleString("en-US")}`;
const percent = (value: number) => ((value - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

const labelClasses = "mb-2 block text-xs uppercase tracking-[0.04em] text-ink";
const selectBase =
  "w-full appearance-none rounded-md border border-ink-soft/60 bg-paper py-2.5 pl-3 pr-10 text-sm text-ink";

type SelectFieldProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  large?: boolean;
  className?: string;
};

// Label + native <select> with a custom chevron. Native select keeps keyboard/mobile behavior.
function SelectField({ label, value, options, onChange, large, className = "" }: SelectFieldProps) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={
            large
              ? "w-full appearance-none rounded-md border border-ink-soft/60 bg-field py-3.5 pl-4 pr-12 text-base text-ink"
              : selectBase
          }
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 fill-none stroke-ink stroke-[1.5] ${
            large ? "right-4 size-6" : "right-3 size-4"
          }`}
        >
          <path d="m4 7 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}

export function SearchPanel() {
  const id = useId();
  const [filters, setFilters] = useState(defaults);
  const [[minPrice, maxPrice], setPrice] = useState<[number, number]>(DEFAULT_PRICE);
  const [summary, setSummary] = useState<string | null>(null);

  const setFilter = (key: keyof typeof defaults) => (value: string) =>
    setFilters((current) => ({ ...current, [key]: value }));

  // The min handle can never pass the max handle (and vice versa).
  const changeMin = (value: number) => setPrice([Math.min(value, maxPrice - PRICE_STEP), maxPrice]);
  const changeMax = (value: number) => setPrice([minPrice, Math.max(value, minPrice + PRICE_STEP)]);

  function handleReset() {
    setFilters(defaults);
    setPrice(DEFAULT_PRICE);
    setSummary(null);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSummary(
      [
        `Location: ${filters.location}`,
        `Type: ${filters.type}`,
        `Sort: ${filters.sort}`,
        `Bedrooms: ${filters.beds}`,
        `Baths: ${filters.baths}`,
        `Price: ${formatPrice(minPrice)} – ${formatPrice(maxPrice)}`,
      ].join(" · "),
    );
  }

  // When both handles sit at the far right, put the min handle on top so it can still be dragged left.
  const minOnTop = minPrice >= PRICE_MAX - PRICE_STEP * 10;

  return (
    <section
      aria-labelledby={`${id}-title`}
      className="rounded-3xl bg-paper px-5 py-6 shadow-2xl shadow-ink/15 sm:px-8 lg:px-9 lg:py-8"
    >
      <div className="flex items-start justify-between gap-4 border-b border-ink-soft/40 pb-4">
        <div>
          <h2 id={`${id}-title`} className="text-2xl text-ink lg:text-[1.65rem]">
            Find Your Property
          </h2>
          <p className="mt-1 font-serif text-sm text-ink-soft sm:text-base">
            Explore premier architectural residences, desert ranches &amp; private acreages
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="flex shrink-0 items-center gap-1.5 text-xs uppercase tracking-[0.04em] text-ink hover:text-taupe-dark"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5 fill-none stroke-current stroke-[1.4]">
            <path d="M16.5 10a6.5 6.5 0 1 1-2-4.7M16.5 3v3.5H13" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Reset
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
        <SelectField
          large
          label="Location"
          value={filters.location}
          options={locations}
          onChange={setFilter("location")}
          className="sm:col-span-2 lg:col-span-4"
        />
        <SelectField label="Type" value={filters.type} options={propertyTypes} onChange={setFilter("type")} />
        <SelectField label="Sort by" value={filters.sort} options={sortOptions} onChange={setFilter("sort")} />
        <SelectField label="Bedrooms" value={filters.beds} options={bedroomOptions} onChange={setFilter("beds")} />
        <SelectField label="Baths" value={filters.baths} options={bathOptions} onChange={setFilter("baths")} />

        <div role="group" aria-labelledby={`${id}-price`}>
          <span id={`${id}-price`} className={labelClasses}>
            Price range
          </span>
          <p className="mb-3 text-base font-medium text-ink">
            {formatPrice(minPrice)} – {formatPrice(maxPrice)}
          </p>
          {/* relative + h-4 are plain utilities so the stacked track can never escape this box */}
          <div className="range-dual relative h-4">
            {/* Native thumbs travel from 0.5rem to (100% - 0.5rem), so the drawn track is inset by the same
                amount; otherwise the highlighted segment would drift away from the thumbs. */}
            <div aria-hidden="true" className="absolute inset-y-0 left-2 right-2">
              <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-line" />
              <div
                className="absolute top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-ink"
                style={{ left: `${percent(minPrice)}%`, right: `${100 - percent(maxPrice)}%` }}
              />
            </div>
            <input
              type="range"
              aria-label="Minimum price"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={PRICE_STEP}
              value={minPrice}
              onChange={(event) => changeMin(Number(event.target.value))}
              style={{ zIndex: minOnTop ? 2 : 1 }}
            />
            <input
              type="range"
              aria-label="Maximum price"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={PRICE_STEP}
              value={maxPrice}
              onChange={(event) => changeMax(Number(event.target.value))}
              style={{ zIndex: minOnTop ? 1 : 2 }}
            />
          </div>
        </div>

        <button type="submit" className={buttonClasses("sand", "self-end")}>
          Search Properties
        </button>
      </form>

      <p className="mt-5 text-xs text-ink-soft">
        Demo only: this search is not connected to live listings.
      </p>
      <p role="status" className="mt-2 text-sm text-ink">
        {summary
          ? `You chose: ${summary}. No listings were searched. Live search will be added once a verified listing source is connected.`
          : ""}
      </p>
    </section>
  );
}
