import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useHospitalStore } from '../../store/hospital.store';

import ImageUpload from '../../../../shared/components/ImageUpload/ImageUpload';
import MediFindLogo from '../../../../components/common/MediFindLogo/MediFindLogo';

import './createHospitalPage.css';

import {
  createHospitalSchema,
  type CreateHospitalFormData,
} from '../../validators/createHospital.schema';

export default function CreateHospitalPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const createHospitalAction = useHospitalStore((state) => state.createHospitalAction);
  const loading = useHospitalStore((state) => state.loading);

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [hospitalImage, setHospitalImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<CreateHospitalFormData>({
    resolver: zodResolver(createHospitalSchema),
    mode: 'onChange',
  });

  const formValues = watch();

  const handleImageSelect = (file: File) => {
    setHospitalImage(file);
    setImagePreviewUrl(URL.createObjectURL(file));
  };

  const handleNextStep = async () => {
    if (currentStep === 1) {
      const isValid = await trigger(['name', 'email', 'phone', 'description']);
      if (isValid) setCurrentStep(2);
    } else if (currentStep === 2) {
      const isValid = await trigger([
        'address',
        'city',
        'state',
        'country',
        'zipcode',
        'latitude',
        'longitude',
      ]);
      if (isValid) setCurrentStep(3);
    }
  };

  const onSubmit = async (data: CreateHospitalFormData) => {
    try {
      setServerError('');
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      if (hospitalImage) {
        formData.append('image', hospitalImage);
      }

      await createHospitalAction(formData);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error(error);
      setServerError('An unexpected gateway exception occurred during profile creation.');
    }
  };

  // Check if steps contain validation errors for tab badges
  const step1HasError = Boolean(errors.name || errors.email || errors.phone || errors.description);
  const step2HasError = Boolean(
    errors.address ||
      errors.city ||
      errors.state ||
      errors.country ||
      errors.zipcode ||
      errors.latitude ||
      errors.longitude
  );
  const step3HasError = Boolean(errors.licenseNumber);

  return (
    <div className="create-hospital-container">
      {/* Dynamic Background Glow Elements */}
      <div className="bg-glow bg-glow-1" aria-hidden="true" />
      <div className="bg-glow bg-glow-2" aria-hidden="true" />

      <main className="create-hospital-card">
        {/* Top Header */}
        <header className="hospital-header">
          <div className="header-top-row">
            <button
              type="button"
              className="back-btn"
              onClick={() => navigate('/admin/dashboard')}
              title="Return to Dashboard"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Back to Dashboard</span>
            </button>

            <MediFindLogo size="sm" subtitle="Admin Workspace" />
          </div>

          <div className="header-titles">
            <h1>Create Hospital Workspace</h1>
            <p>Configure facility assets, credentials, and location settings</p>
          </div>
        </header>

        {/* Interactive Step Navigator */}
        <div className="stepper-bar">
          <button
            type="button"
            className={`step-tab ${currentStep === 1 ? 'active' : ''} ${step1HasError ? 'has-error' : ''}`}
            onClick={() => setCurrentStep(1)}
          >
            <span className="step-num">1</span>
            <span className="step-label">Basic Overview</span>
            {step1HasError && <span className="error-dot" title="Has errors"></span>}
          </button>

          <div className="step-connector"></div>

          <button
            type="button"
            className={`step-tab ${currentStep === 2 ? 'active' : ''} ${step2HasError ? 'has-error' : ''}`}
            onClick={() => setCurrentStep(2)}
          >
            <span className="step-num">2</span>
            <span className="step-label">Location & Map</span>
            {step2HasError && <span className="error-dot" title="Has errors"></span>}
          </button>

          <div className="step-connector"></div>

          <button
            type="button"
            className={`step-tab ${currentStep === 3 ? 'active' : ''} ${step3HasError ? 'has-error' : ''}`}
            onClick={() => setCurrentStep(3)}
          >
            <span className="step-num">3</span>
            <span className="step-label">License & Photo</span>
            {step3HasError && <span className="error-dot" title="Has errors"></span>}
          </button>
        </div>

        {/* Server Error Notification */}
        {serverError && (
          <div className="server-error" role="alert">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{serverError}</span>
          </div>
        )}

        {/* Workspace Layout Split (Form + Live Preview Card) */}
        <div className="workspace-split">
          {/* Main Form Content */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="hospital-form">
            {/* STEP 1: Basic Information */}
            <div className={`step-panel ${currentStep === 1 ? 'active' : ''}`}>
              <div className="panel-title">1. Basic Facility Information</div>
              <div className="form-grid-two">
                <div className="form-group">
                  <label htmlFor="hosp-name">Hospital Name *</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                    </svg>
                    <input
                      id="hosp-name"
                      type="text"
                      placeholder="e.g. Aster Medcity Specialty"
                      aria-invalid={errors.name ? 'true' : 'false'}
                      {...register('name')}
                    />
                  </div>
                  {errors.name && <p className="error-message">{errors.name.message}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="hosp-email">Official Email *</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                    <input
                      id="hosp-email"
                      type="email"
                      placeholder="admin@astermedcity.com"
                      aria-invalid={errors.email ? 'true' : 'false'}
                      {...register('email')}
                    />
                  </div>
                  {errors.email && <p className="error-message">{errors.email.message}</p>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="hosp-phone">Emergency Contact Phone *</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <input
                    id="hosp-phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    {...register('phone')}
                  />
                </div>
                {errors.phone && <p className="error-message">{errors.phone.message}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="hosp-description">Facility Bio & Specializations *</label>
                <textarea
                  id="hosp-description"
                  rows={3}
                  placeholder="Summarize key medical departments, ICU capacity, trauma care facilities..."
                  aria-invalid={errors.description ? 'true' : 'false'}
                  {...register('description')}
                />
                {errors.description && <p className="error-message">{errors.description.message}</p>}
              </div>
            </div>

            {/* STEP 2: Location & Address Details */}
            <div className={`step-panel ${currentStep === 2 ? 'active' : ''}`}>
              <div className="panel-title">2. Address & Geographic Coordinates</div>
              <div className="form-group">
                <label htmlFor="hosp-address">Street Address *</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <input
                    id="hosp-address"
                    type="text"
                    placeholder="Kuttisahib Road, Cheranalloor"
                    aria-invalid={errors.address ? 'true' : 'false'}
                    {...register('address')}
                  />
                </div>
                {errors.address && <p className="error-message">{errors.address.message}</p>}
              </div>

              <div className="form-grid-three">
                <div className="form-group">
                  <label htmlFor="hosp-city">City *</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 21h18"></path>
                      <path d="M6 18V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14"></path>
                    </svg>
                    <input
                      id="hosp-city"
                      type="text"
                      placeholder="Kochi"
                      aria-invalid={errors.city ? 'true' : 'false'}
                      {...register('city')}
                    />
                  </div>
                  {errors.city && <p className="error-message">{errors.city.message}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="hosp-state">State *</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
                      <line x1="9" y1="3" x2="9" y2="18"></line>
                      <line x1="15" y1="6" x2="15" y2="21"></line>
                    </svg>
                    <input
                      id="hosp-state"
                      type="text"
                      placeholder="Kerala"
                      aria-invalid={errors.state ? 'true' : 'false'}
                      {...register('state')}
                    />
                  </div>
                  {errors.state && <p className="error-message">{errors.state.message}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="hosp-country">Country *</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    <input
                      id="hosp-country"
                      type="text"
                      placeholder="India"
                      aria-invalid={errors.country ? 'true' : 'false'}
                      {...register('country')}
                    />
                  </div>
                  {errors.country && <p className="error-message">{errors.country.message}</p>}
                </div>
              </div>

              <div className="form-grid-three">
                <div className="form-group">
                  <label htmlFor="hosp-zipcode">Postal Code *</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                      <path d="M7 7h10"></path>
                      <path d="M7 12h10"></path>
                      <path d="M7 17h10"></path>
                    </svg>
                    <input
                      id="hosp-zipcode"
                      type="text"
                      placeholder="682027"
                      aria-invalid={errors.zipcode ? 'true' : 'false'}
                      {...register('zipcode')}
                    />
                  </div>
                  {errors.zipcode && <p className="error-message">{errors.zipcode.message}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="hosp-latitude">Latitude *</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z"></path>
                    </svg>
                    <input
                      id="hosp-latitude"
                      type="number"
                      step="any"
                      placeholder="10.0261"
                      aria-invalid={errors.latitude ? 'true' : 'false'}
                      {...register('latitude', { valueAsNumber: true })}
                    />
                  </div>
                  {errors.latitude && <p className="error-message">{errors.latitude.message}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="hosp-longitude">Longitude *</label>
                  <div className="input-wrapper">
                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z"></path>
                    </svg>
                    <input
                      id="hosp-longitude"
                      type="number"
                      step="any"
                      placeholder="76.3096"
                      aria-invalid={errors.longitude ? 'true' : 'false'}
                      {...register('longitude', { valueAsNumber: true })}
                    />
                  </div>
                  {errors.longitude && <p className="error-message">{errors.longitude.message}</p>}
                </div>
              </div>
            </div>

            {/* STEP 3: License & Image Media Upload */}
            <div className={`step-panel ${currentStep === 3 ? 'active' : ''}`}>
              <div className="panel-title">3. Credentials & Profile Media</div>
              <div className="form-group">
                <label htmlFor="hosp-license">License Registration ID *</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  <input
                    id="hosp-license"
                    type="text"
                    placeholder="MCI-HOSP-2026-X"
                    aria-invalid={errors.licenseNumber ? 'true' : 'false'}
                    {...register('licenseNumber')}
                  />
                </div>
                {errors.licenseNumber && (
                  <p className="error-message">{errors.licenseNumber.message}</p>
                )}
              </div>

              <div className="image-upload-wrapper-box">
                <ImageUpload label="Hospital Profile Banner / Logo" onImageSelect={handleImageSelect} />
              </div>
            </div>

            {/* Form Step Buttons */}
            <div className="form-actions">
              {currentStep > 1 && (
                <button
                  type="button"
                  className="step-btn secondary"
                  onClick={() => setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3)}
                >
                  ← Back
                </button>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  className="step-btn primary"
                  onClick={handleNextStep}
                >
                  <span>Continue Step {currentStep + 1}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              ) : (
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <svg className="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                      </svg>
                      <span>Creating Profile...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete Registration</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6 9 17l-5-5"></path>
                      </svg>
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

          {/* Live Preview Side Card (Real-Time Visual Representation) */}
          <aside className="preview-aside">
            <div className="preview-card-label">Live Preview</div>
            <div className="live-hospital-card">
              <div className="preview-media-box">
                {imagePreviewUrl ? (
                  <img src={imagePreviewUrl} alt="Hospital Preview" className="preview-img" />
                ) : (
                  <div className="preview-media-placeholder">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                      <path d="M10 6h4"></path>
                      <path d="M12 4v4"></path>
                    </svg>
                    <span>No Image Uploaded</span>
                  </div>
                )}
                <span className="live-badge">
                  <span className="live-dot"></span> Active
                </span>
              </div>

              <div className="preview-details">
                <h3 className="preview-title">
                  {formValues.name || 'Hospital Name'}
                </h3>

                <div className="preview-meta">
                  <div className="meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>
                      {formValues.city || formValues.country
                        ? `${formValues.city || ''}, ${formValues.country || ''}`
                        : 'City, Country'}
                    </span>
                  </div>

                  <div className="meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <span>{formValues.licenseNumber || 'License ID'}</span>
                  </div>
                </div>

                <p className="preview-description">
                  {formValues.description ||
                    'Facility overview and specialized department details will be showcased here.'}
                </p>

                <div className="preview-footer-info">
                  <div className="footer-chip">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                    <span>{formValues.email || 'contact@medifind.com'}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}



