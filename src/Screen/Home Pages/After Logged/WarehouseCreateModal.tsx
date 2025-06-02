import { apiService } from "@/components/APIService/ApiService";
import { useState, ChangeEvent } from "react";

interface Price {
  title: string;
  amount: number;
  isMonthly: boolean;
}
interface Room {
  name: string;
  units: number;
}

interface Facility {
  icon: string;
  name: string;
  value: string;
}

interface NearestFacility {
  icon: string;
  name: string;
  value: string;
}

interface FormState {
  name: string;
  about: string;
  category: string;
  rentOrSell: "Rent" | "Sell";
  areaSqFt: number;
  location: { coordinates: [string, string] };
  address: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  price: Price[];
  rooms: Room[];
  facility: Facility[];
  nearestFacility: NearestFacility[];
  thumbnail: File | null;
  images: File[];
}

type WarehouseCreateResponse = {
  data: {
    _id: string;
    // Add any other fields returned here if needed
  };
};

export default function WarehouseCreateModal() {
  const [step, setStep] = useState<number>(1);
  const [errors, setErrors] = useState<string[]>([]);
  const [warehouseId, setWarehouseId] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>({
    name: "",
    about: "",
    category: "",
    rentOrSell: "Rent",
    areaSqFt: 0,
    location: { coordinates: ["", ""] },
    address: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
    price: [],
    rooms: [],
    facility: [],
    nearestFacility: [],
    thumbnail: null,
    images: [],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const coords = [...form.location.coordinates] as [string, string];
    coords[index] = e.target.value;
    setForm((prev) => ({
      ...prev,
      location: { coordinates: coords },
    }));
  };

  const validateStep1 = () => {
    const requiredFields: (keyof FormState)[] = [
      "name",
      "about",
      "category",
      "rentOrSell",
      "areaSqFt",
      "address",
      "city",
      "pincode",
      "state",
      "country",
    ];

    const missing = requiredFields.filter((field) => !form[field]);
    const missingCoords = form.location.coordinates.some((c) => !c);

    if (missing.length || missingCoords) {
      const msgs = missing.map((f) => `${f} is required.`);
      if (missingCoords) msgs.push("Latitude and Longitude are required.");
      setErrors(msgs);
      return false;
    }

    setErrors([]);
    return true;
  };

  const validateStep3 = () => {
    if (form.price.length === 0) {
      setErrors(["At least one price entry is required."]);
      return false;
    }
    const invalid = form.price.some((p) => !p.title || !p.amount);
    if (invalid) {
      setErrors(["Each price entry must have a title and amount."]);
      return false;
    }
    setErrors([]);
    return true;
  };

  const handleNext = async () => {
    if (step === 1) {
      if (!validateStep1()) return;
      setStep(2);
    } else if (step === 2) {
      // You can optionally add a validateStep2() function here if needed
      setStep(3);
    } else if (step === 3) {
      if (!validateStep3()) return;
      try {
        const { thumbnail, images, location, ...rest } = form;

        const warehouseData = {
          ...rest,
          location: JSON.stringify(location), // ✅ convert to string
          paymentDueDays: form.rentOrSell === "Rent" ? 31 : undefined, // ✅ example value
        };

        const created = await apiService.post<WarehouseCreateResponse>(
          "/warehouse/create",
          warehouseData
        );
        console.log("✅ Warehouse created:", created);
        setWarehouseId(created.data._id);
        console.log("Warehouse ID:", created.data._id);
        setStep(4);
      } catch (err) {
        console.error("❌ Error creating warehouse:", err);
        setErrors(["Failed to create warehouse. Try again."]);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      if (!warehouseId) {
        setErrors(["Warehouse ID missing. Please restart."]);
        return;
      }

      const formData = new FormData();
      if (form.thumbnail) formData.append("thumbnail", form.thumbnail);

      form.images.forEach((img) => {
        formData.append("images", img);
      });

      console.log("Uploading to: ", `/warehouse/upload/${warehouseId}`);
      for (let [key, val] of formData.entries()) {
        console.log(`${key}:`, val); // Helpful for debugging
      }

      const response = await apiService.post(
        `/warehouse/upload/${warehouseId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("✅ Warehouse created and images uploaded!", response);
      (
        document.getElementById("warehouse_create_modal") as HTMLDialogElement
      )?.close();

      resetForm();
    } catch (err) {
      console.error("❌ Error uploading images:", err);
      setErrors(["Image upload failed. Check console for details."]);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      about: "",
      category: "",
      rentOrSell: "Rent",
      areaSqFt: 0,
      location: { coordinates: ["", ""] },
      address: "",
      city: "",
      pincode: "",
      state: "",
      country: "",
      price: [],
      rooms: [],
      facility: [],
      nearestFacility: [],
      thumbnail: null,
      images: [],
    });
    setStep(1);
    setErrors([]);
    setWarehouseId(null);
  };

  return (
    <dialog id="warehouse_create_modal" className="modal">
      <div className="modal-box w-full max-w-4xl">
        <h3 className="font-bold text-xl mb-4">Add New Warehouse</h3>

        <ul className="steps w-full mb-4">
          <li className={`step ${step >= 1 && "step-primary"}`}>Basic</li>
          <li className={`step ${step >= 2 && "step-primary"}`}>
            Warehouse Information
          </li>
          <li className={`step ${step >= 3 && "step-primary"}`}>Price</li>
          <li className={`step ${step >= 4 && "step-primary"}`}>Images</li>
        </ul>

        {errors.length > 0 && (
          <div className="text-red-500 text-sm mb-2 space-y-1">
            {errors.map((err, idx) => (
              <div key={idx}>⚠️ {err}</div>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "name",
              "category",
              "about",
              "areaSqFt",
              "address",
              "city",
              "pincode",
              "state",
              "country",
            ].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="input input-bordered"
                onChange={handleChange}
                value={(form as any)[field]}
              />
            ))}
            <select
              name="rentOrSell"
              className="select select-bordered"
              onChange={handleChange}
              value={form.rentOrSell}
            >
              <option value="Rent">Rent</option>
              <option value="Sell">Sell</option>
            </select>
            <input
              type="text"
              placeholder="Latitude"
              className="input input-bordered"
              onChange={(e) => handleLocationChange(e, 0)}
              value={form.location.coordinates[0]}
            />
            <input
              type="text"
              placeholder="Longitude"
              className="input input-bordered"
              onChange={(e) => handleLocationChange(e, 1)}
              value={form.location.coordinates[1]}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            {/* Rooms Section */}
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Rooms</h2>
              <button
                className="btn btn-outline btn-sm"
                onClick={() =>
                  setForm({
                    ...form,
                    rooms: [...form.rooms, { name: "", units: 0 }],
                  })
                }
              >
                + Add Room
              </button>
              {form.rooms.map((p, i) => (
                <div className="grid grid-cols-3 gap-2" key={i}>
                  <input
                    type="text"
                    placeholder="Title"
                    className="input input-bordered"
                    value={p.name}
                    onChange={(e) => {
                      const updated = [...form.rooms];
                      updated[i].name = e.target.value;
                      setForm({ ...form, rooms: updated });
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Unit"
                    className="input input-bordered"
                    value={p.units}
                    onChange={(e) => {
                      const updated = [...form.rooms];
                      updated[i].units = Number(e.target.value); // ✅ convert to number
                      setForm({ ...form, rooms: updated });
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Facility Section */}
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Facilities</h2>
              <button
                className="btn btn-outline btn-sm"
                onClick={() =>
                  setForm({
                    ...form,
                    facility: [
                      ...form.facility,
                      { icon: "", name: "", value: "" },
                    ],
                  })
                }
              >
                + Add Facility
              </button>
              {form.facility.map((f, i) => (
                <div className="grid grid-cols-3 gap-2" key={i}>
                  <input
                    type="text"
                    placeholder="Icon"
                    className="input input-bordered"
                    value={f.icon}
                    onChange={(e) => {
                      const updated = [...form.facility];
                      updated[i].icon = e.target.value;
                      setForm({ ...form, facility: updated });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                    value={f.name}
                    onChange={(e) => {
                      const updated = [...form.facility];
                      updated[i].name = e.target.value;
                      setForm({ ...form, facility: updated });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    className="input input-bordered"
                    value={f.value}
                    onChange={(e) => {
                      const updated = [...form.facility];
                      updated[i].value = e.target.value;
                      setForm({ ...form, facility: updated });
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Nearest Facility Section */}
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Nearest Facilities</h2>
              <button
                className="btn btn-outline btn-sm"
                onClick={() =>
                  setForm({
                    ...form,
                    nearestFacility: [
                      ...form.nearestFacility,
                      { icon: "", name: "", value: "" },
                    ],
                  })
                }
              >
                + Add Nearest Facility
              </button>
              {form.nearestFacility.map((nf, i) => (
                <div className="grid grid-cols-3 gap-2" key={i}>
                  <input
                    type="text"
                    placeholder="Icon"
                    className="input input-bordered"
                    value={nf.icon}
                    onChange={(e) => {
                      const updated = [...form.nearestFacility];
                      updated[i].icon = e.target.value;
                      setForm({ ...form, nearestFacility: updated });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                    value={nf.name}
                    onChange={(e) => {
                      const updated = [...form.nearestFacility];
                      updated[i].name = e.target.value;
                      setForm({ ...form, nearestFacility: updated });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    className="input input-bordered"
                    value={nf.value}
                    onChange={(e) => {
                      const updated = [...form.nearestFacility];
                      updated[i].value = e.target.value;
                      setForm({ ...form, nearestFacility: updated });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <button
              className="btn btn-outline btn-sm"
              onClick={() =>
                setForm({
                  ...form,
                  price: [
                    ...form.price,
                    { title: "", amount: 0, isMonthly: false }, // ✅ amount is a number
                  ],
                })
              }
            >
              + Add Price
            </button>
            {form.price.map((p, i) => (
              <div className="grid grid-cols-3 gap-2" key={i}>
                <input
                  type="text"
                  placeholder="Title"
                  className="input input-bordered"
                  value={p.title}
                  onChange={(e) => {
                    const updated = [...form.price];
                    updated[i].title = e.target.value;
                    setForm({ ...form, price: updated });
                  }}
                />
                <input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Amount"
                  className="input input-bordered"
                  value={p.amount}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only digits
                    if (/^\d*$/.test(value)) {
                      const updated = [...form.price];
                      updated[i].amount = Number(value);
                      setForm({ ...form, price: updated });
                    }
                  }}
                />

                <select
                  className="select select-bordered"
                  value={p.isMonthly ? "true" : "false"}
                  onChange={(e) => {
                    const updated = [...form.price];
                    updated[i].isMonthly = e.target.value === "true";
                    setForm({ ...form, price: updated });
                  }}
                >
                  <option value="false">One-time</option>
                  <option value="true">Monthly</option>
                </select>
              </div>
            ))}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div>
              <label className="label">Thumbnail Image</label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setForm({
                    ...form,
                    thumbnail: e.target.files?.[0] ?? null,
                  })
                }
              />
            </div>
            <div>
              <label className="label">Warehouse Images</label>
              <input
                type="file"
                multiple
                className="file-input file-input-bordered w-full"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setForm({
                    ...form,
                    images: e.target.files ? Array.from(e.target.files) : [],
                  })
                }
              />
            </div>
          </div>
        )}

        <div className="modal-action justify-between">
          {step > 1 && (
            <button
              className="btn btn-outline"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
          )}
          {step < 4 ? (
            <button className="btn btn-primary" onClick={handleNext}>
              Next
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
