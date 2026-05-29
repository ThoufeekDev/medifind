import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useHospitalStore } from "../store/hospital.store";
import "../../../styles/CreateHospitalPage.css"

import {
  createHospitalSchema,
  type CreateHospitalFormData
} from "../validators/createHospital.Schema";

export default function CreateHospitalPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const createHospitalAction = useHospitalStore(state => state.createHospitalAction);
  const loading = useHospitalStore(state => state.loading);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateHospitalFormData>({
    resolver: zodResolver(createHospitalSchema)
  });

  const onSubmit = async (data: CreateHospitalFormData) => {
    try {
      setServerError("");
      await createHospitalAction(data);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error);
      setServerError("An unexpected gateway exception occurred during profile creation.");
    }
  };

  return (
    <div className="create-hospital-container">
      <main className="create-hospital-card">
        
        {/* Identity Context Headers */}
        <header className="hospital-header">
          <h1>Create Hospital</h1>
          <p>Configure and publish your medical infrastructure workspace profile</p>
        </header>

        {/* Action Failure Warnings */}
        {serverError && (
          <div className="server-error" role="alert">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{serverError}</span>
          </div>
        )}

        {/* Dynamic Data Gathering Matrix */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          {/* HOSPITAL NAME */}
          <div className="form-group">
            <label htmlFor="hosp-name">Hospital Name</label>
            <input
              id="hosp-name"
              type="text"
              placeholder="Aster Medcity"
              aria-invalid={errors.name ? "true" : "false"}
              {...register("name")}
            />
            {errors.name && <p className="error-message">{errors.name.message}</p>}
          </div>

          {/* CONTACT DUAL BLOCK GRID */}
          <div className="grid-two">
            <div className="form-group">
              <label htmlFor="hosp-email">Administrative Email</label>
              <input
                id="hosp-email"
                type="email"
                placeholder="hospital@gmail.com"
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email")}
              />
              {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="hosp-phone">Contact Telephone</label>
              <input
                id="hosp-phone"
                type="tel"
                placeholder="+91 9876543210"
                aria-invalid={errors.phone ? "true" : "false"}
                {...register("phone")}
              />
              {errors.phone && <p className="error-message">{errors.phone.message}</p>}
            </div>
          </div>

          {/* PHYSICAL LOCATION ADDRESS */}
          <div className="form-group">
            <label htmlFor="hosp-address">Street Address</label>
            <input
              id="hosp-address"
              type="text"
              placeholder="123 Healthcare Boulevard, Suite 40"
              aria-invalid={errors.address ? "true" : "false"}
              {...register("address")}
            />
            {errors.address && <p className="error-message">{errors.address.message}</p>}
          </div>

          {/* AREA LOCALE SPLIT GRID */}
          <div className="grid-two">
            <div className="form-group">
              <label htmlFor="hosp-city">City</label>
              <input
                id="hosp-city"
                type="text"
                placeholder="Kochi"
                aria-invalid={errors.city ? "true" : "false"}
                {...register("city")}
              />
              {errors.city && <p className="error-message">{errors.city.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="hosp-state">State / Province</label>
              <input
                id="hosp-state"
                type="text"
                placeholder="Kerala"
                aria-invalid={errors.state ? "true" : "false"}
                {...register("state")}
              />
              {errors.state && <p className="error-message">{errors.state.message}</p>}
            </div>
          </div>

          {/* REGIONAL GEO IDENTIFIER INDEX GRID */}
          <div className="grid-two">
            <div className="form-group">
              <label htmlFor="hosp-country">Country</label>
              <input
                id="hosp-country"
                type="text"
                placeholder="India"
                aria-invalid={errors.country ? "true" : "false"}
                {...register("country")}
              />
              {errors.country && <p className="error-message">{errors.country.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="hosp-zipcode">Postal Zipcode</label>
              <input
                id="hosp-zipcode"
                type="text"
                placeholder="682027"
                aria-invalid={errors.zipcode ? "true" : "false"}
                {...register("zipcode")}
              />
              {errors.zipcode && <p className="error-message">{errors.zipcode.message}</p>}
            </div>
          </div>

          {/* TELEMETRY ENGINE COORDINATES VECTOR GRID */}
          <div className="grid-two">
            <div className="form-group">
              <label htmlFor="hosp-latitude">Map Latitude Coordinate</label>
              <input
                id="hosp-latitude"
                type="number"
                step="any"
                placeholder="10.0261"
                aria-invalid={errors.latitude ? "true" : "false"}
                {...register("latitude", { valueAsNumber: true })}
              />
              {errors.latitude && <p className="error-message">{errors.latitude.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="hosp-longitude">Map Longitude Coordinate</label>
              <input
                id="hosp-longitude"
                type="number"
                step="any"
                placeholder="76.3096"
                aria-invalid={errors.longitude ? "true" : "false"}
                {...register("longitude", { valueAsNumber: true })}
              />
              {errors.longitude && <p className="error-message">{errors.longitude.message}</p>}
            </div>
          </div>

          {/* CORPORATE LEGAL REGISTRATION */}
          <div className="form-group">
            <label htmlFor="hosp-license">Medical License Identification Number</label>
            <input
              id="hosp-license"
              type="text"
              placeholder="MCI-HOSP-2026-X"
              aria-invalid={errors.licenseNumber ? "true" : "false"}
              {...register("licenseNumber")}
            />
            {errors.licenseNumber && <p className="error-message">{errors.licenseNumber.message}</p>}
          </div>

          {/* PROFILE SUMMARY EXTENSION */}
          <div className="form-group">
            <label htmlFor="hosp-description">Institution Profile Description</label>
            <textarea
              id="hosp-description"
              rows={5}
              placeholder="Outline specialized medical departments, clinical facilities, emergency trauma care capabilities, and overall corporate history..."
              aria-invalid={errors.description ? "true" : "false"}
              {...register("description")}
            />
            {errors.description && <p className="error-message">{errors.description.message}</p>}
          </div>

          {/* ACTION SUBMISSION ENGINE PIN */}
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Registering Workspace Assets..." : "Save Hospital Profile"}
          </button>

        </form>
      </main>
    </div>
  );
}