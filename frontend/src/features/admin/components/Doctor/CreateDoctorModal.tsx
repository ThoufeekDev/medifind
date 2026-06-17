import React from "react";
import { useState } from "react";
import "./createDoctorModal.css";
import type { Specialization } from "../../types/specialization.types";
import { createDoctor } from "../../services/doctor.service";
import { createDoctorSchema, type CreateDoctorFormData } from "../../validators/createDoctor.schema";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

interface Props {
  specializations: Specialization[];
  isOpen: boolean;
  onClose: () => void;
  onSuccess:() => void;
}

export default function CreateDoctorModal({ specializations, isOpen, onClose,onSuccess }: Props) {
    const [isLoading,setLoading] = useState(false);
    const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<CreateDoctorFormData>({
  resolver:zodResolver(createDoctorSchema),
  defaultValues:{
    gender:"MALE"
  }
});

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };





const onSubmit = async (data: CreateDoctorFormData) => {
  try {
    setLoading(true);

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("gender", data.gender);
    formData.append("qualification", data.qualification);
    formData.append("experience", String(data.experience));
    formData.append("consultationFee", String(data.consultationFee));
    formData.append("specializationId", data.specializationId);

    if (data.bio) {
      formData.append("bio", data.bio);
    }

    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }

    await createDoctor(formData);
        toast.success(
      "Doctor created successfully"
    );
      onClose()
      reset()
      onSuccess();
  } catch (error) {
    console.error(error);
        toast.error(
      "Failed to create doctor"
    );
  } finally {
    
    setLoading(false);
  
  }
};
  return (
  <div
    className="modal-overlay"
    onClick={handleBackdropClick}
    role="dialog"
    aria-modal="true"
  >
    <div className="modal-card">
      <header className="modal-header">
        <h2>Create Doctor Profile</h2>

        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close form view portal"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="modal-scroll-form"
        noValidate
      >
        {/* NAME */}
        <div className="modal-form-group">
          <label htmlFor="doc-name">
            Doctor Full Name
          </label>

          <div className="modal-input-wrapper">
            <input
              id="doc-name"
              type="text"
              placeholder="Dr. Sarah Alsayed"
              {...register("name")}
            />
          </div>

          {errors.name && (
            <p className="text-red-500 text-sm">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* EMAIL + PHONE */}
        <div className="modal-field-split">
          <div className="modal-form-group">
            <label htmlFor="doc-email">
              Email Address
            </label>

            <div className="modal-input-wrapper">
              <input
                id="doc-email"
                type="email"
                placeholder="doctor@medifind.com"
                {...register("email")}
              />
            </div>

            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="modal-form-group">
            <label htmlFor="doc-phone">
              Contact Phone
            </label>

            <div className="modal-input-wrapper">
              <input
                id="doc-phone"
                type="tel"
                placeholder="+91 9876543210"
                {...register("phone")}
              />
            </div>

            {errors.phone && (
              <p className="text-red-500 text-sm">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* GENDER */}
        <div className="modal-form-group">
          <label>Gender Selection</label>

          <div className="gender-radio-cluster">
            <label className="radio-pill-label">
              <input
                type="radio"
                value="MALE"
                {...register("gender")}
              />
              <span>Male</span>
            </label>

            <label className="radio-pill-label">
              <input
                type="radio"
                value="FEMALE"
                {...register("gender")}
              />
              <span>Female</span>
            </label>
          </div>

          {errors.gender && (
            <p className="text-red-500 text-sm">
              {errors.gender.message}
            </p>
          )}
        </div>

        {/* QUALIFICATION + EXPERIENCE */}
        <div className="modal-field-split">
          <div className="modal-form-group">
            <label htmlFor="qualification">
              Qualification Credentials
            </label>

            <div className="modal-input-wrapper">
              <input
                id="qualification"
                type="text"
                placeholder="MBBS, MD"
                {...register("qualification")}
              />
            </div>

            {errors.qualification && (
              <p className="text-red-500 text-sm">
                {
                  errors.qualification
                    .message
                }
              </p>
            )}
          </div>

          <div className="modal-form-group">
            <label htmlFor="experience">
              Experience (Years)
            </label>

            <div className="modal-input-wrapper">
              <input
                id="experience"
                type="number"
                min="0"
                placeholder="5"
                {...register("experience",{valueAsNumber:true})}
              />
            </div>

            {errors.experience && (
              <p className="text-red-500 text-sm">
                {errors.experience.message}
              </p>
            )}
          </div>
        </div>

        {/* FEE + SPECIALIZATION */}
        <div className="modal-field-split">
          <div className="modal-form-group">
            <label htmlFor="consultationFee">
              Consultation Fee (₹)
            </label>

            <div className="modal-input-wrapper">
              <input
                id="consultationFee"
                type="number"
                min="0"
                placeholder="500"
                {...register(
                  "consultationFee",{
                    valueAsNumber:true
                  }
                )}
              />
            </div>

            {errors.consultationFee && (
              <p className="text-red-500 text-sm">
                {
                  errors.consultationFee
                    .message
                }
              </p>
            )}
          </div>

          <div className="modal-form-group">
            <label htmlFor="specialization">
              Primary Specialization
            </label>

            <div className="modal-input-wrapper">
              <select
                id="specialization"
                {...register(
                  "specializationId"
                )}
              >
                <option value="">
                  Select Specialization
                </option>

                {specializations.map(
                  (item) => (
                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  )
                )}
              </select>
            </div>

            {errors.specializationId && (
              <p className="text-red-500 text-sm">
                {
                  errors
                    .specializationId
                    .message
                }
              </p>
            )}
          </div>
        </div>

        {/* BIO */}
        <div className="modal-form-group">
          <label htmlFor="bio">
            Professional Statement / Bio
          </label>

          <div className="modal-input-wrapper">
            <textarea
              id="bio"
              rows={4}
              placeholder="Outline summary history, specialized achievements..."
              {...register("bio")}
            />
          </div>
        </div>

        {/* IMAGE */}
        <div className="modal-form-group">
          <label htmlFor="doctor-image">
            Profile Image (Optional)
          </label>

          <div className="modal-input-wrapper">
            <input
              id="doctor-image"
              type="file"
              accept="image/*"
              {...register("image")}
            />
          </div>
        </div>

        <footer className="modal-actions-dock">
          <button
            type="button"
            className="modal-cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="modal-submit-btn"
          >
            {isLoading ? "Saving..." : "Create Doctor Profile"}
          </button>
        </footer>
      </form>
    </div>
  </div>
);
}