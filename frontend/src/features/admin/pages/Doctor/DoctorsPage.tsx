import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import DoctorList from '../../components/Doctor/DoctorList';
import CreateDoctorModal from '../../components/Doctor/CreateDoctorModal';

import Loader from '../../../../components/common/Loader';
import InlineLoader from '../../../../components/common/InlineLoader';

import { getDoctors } from '../../services/doctor.service';
import { getSpecialization } from '../../services/specialization.service';


import type { Doctor } from '../../types/doctor.type';
import type { Specialization } from '../../types/specialization.types';

import './DoctorsPage.css';

export default function DoctorsPage() {
  /* ======================================================
     STATE
  ====================================================== */

  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const [specializations, setSpecializations] = useState<Specialization[]>([]);

  const [loading, setLoading] = useState(false);

  const [initialLoading, setInitialLoading] = useState(true);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  /* ======================================================
     URL FILTER STATE
  ====================================================== */

  const selectedSpecializations = searchParams.get('specialization')?.split(',') ?? [];

  const sort = searchParams.get('sort') ?? '';

  const onDuty = searchParams.get('onDuty') === 'true';

  /* ======================================================
     FETCH DOCTORS
  ====================================================== */

  const fetchDoctors = async () => {
    try {
      setLoading(true);

      const data = await getDoctors({
        specializations: selectedSpecializations.length > 0 ? selectedSpecializations : undefined,

        onDuty: searchParams.has('onDuty') ? onDuty : undefined,

        sort: sort || undefined,
      });

      setDoctors(data);
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  /* ======================================================
     FETCH SPECIALIZATIONS
  ====================================================== */

  const fetchSpecializations = async () => {
    try {
      const data = await getSpecialization();

      setSpecializations(data);
    } catch (error) {
      console.error('Failed to fetch specializations:', error);
    }
  };

  /* ======================================================
     INITIAL / FILTERED DATA FETCH
  ====================================================== */

  useEffect(() => {
    fetchDoctors();
  }, [searchParams]);

  /* ======================================================
     FETCH SPECIALIZATIONS ONCE
  ====================================================== */

  useEffect(() => {
    fetchSpecializations();
  }, []);

  /* ======================================================
     SPECIALIZATION FILTER
  ====================================================== */

  const handleSpecializationChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    let selected = [...selectedSpecializations];

    if (selected.includes(value)) {
      selected = selected.filter((item) => item !== value);
    } else {
      selected.push(value);
    }

    if (selected.length > 0) {
      params.set('specialization', selected.join(','));
    } else {
      params.delete('specialization');
    }

    setSearchParams(params);
  };

  /* ======================================================
     CLEAR SPECIALIZATION FILTER
  ====================================================== */

  const handleClearSpecializations = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('specialization');

    setSearchParams(params);
  };

  /* ======================================================
     SORT
  ====================================================== */

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }

    setSearchParams(params);
  };

  /* ======================================================
     ON DUTY
  ====================================================== */

  const handleOnDutyChange = (checked: boolean) => {
    const params = new URLSearchParams(searchParams);

    if (checked) {
      params.set('onDuty', 'true');
    } else {
      params.delete('onDuty');
    }

    setSearchParams(params);
  };

  /* ======================================================
     STATISTICS
  ====================================================== */

  const totalDoctors = doctors.length;

  const activeOnDutyCount = doctors.filter((doctor) => doctor.onDuty).length;

  /* ======================================================
     INITIAL LOADING
  ====================================================== */

  if (initialLoading) {
    return <Loader />;
  }

  /* ======================================================
     PAGE
  ====================================================== */

  return (
    <div className="doctors-page-container">
      {/* ==================================================
          PAGE HEADER
      ================================================== */}

      <header className="directory-header">
        <div className="header-left-info">
          <div className="meta-badge">
            <svg
              className="meta-icon"
              viewBox="0 0 24 24"
              width="13"
              height="13"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />

              <circle cx="9" cy="7" r="4" />

              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />

              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>

            <span>MEDICAL STAFF</span>
          </div>

          <h1 className="directory-title">Doctors Directory</h1>

          <p className="directory-subtitle">
            Manage and monitor {totalDoctors} specialized{' '}
            {totalDoctors === 1 ? 'doctor' : 'doctors'} across all departments.
          </p>
        </div>

        {/* HEADER ACTIONS */}

        <div className="header-right-actions">
          <button type="button" className="btn-secondary-custom">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />

              <polyline points="7 10 12 15 17 10" />

              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export List
          </button>

          <button
            type="button"
            className="btn-primary-custom"
            onClick={() => setShowCreateModal(true)}
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="12" y1="5" x2="12" y2="19" />

              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Doctor
          </button>
        </div>
      </header>

      {/* ==================================================
          FILTER + STATISTICS
      ================================================== */}

      <section className="filters-stats-row">
        {/* FILTER CARD */}

        <div className="directory-controls-card">
          {/* SPECIALIZATION */}

          <div className="department-filter-section">
            <span className="control-label">Specialization</span>

            <div className="filter-pills-container">
              <button
                type="button"
                className={`filter-pill ${selectedSpecializations.length === 0 ? 'active' : ''}`}
                onClick={handleClearSpecializations}
              >
                All Units
              </button>

              {specializations.map((specialization) => {
                const isSelected = selectedSpecializations.includes(specialization.name);

                return (
                  <button
                    type="button"
                    key={specialization.id}
                    className={`filter-pill ${isSelected ? 'active' : ''}`}
                    onClick={() => handleSpecializationChange(specialization.name)}
                  >
                    {specialization.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="control-divider" />

          {/* SORT */}

          <div className="sort-section">
            <span className="control-label">Sort By</span>

            <div className="sort-select-wrapper">
              <select
                value={sort}
                onChange={(event) => handleSortChange(event.target.value)}
                className="custom-select"
                aria-label="Sort doctors"
              >
                <option value="">Sort Option</option>

                <option value="experience-desc">Experience: High to Low</option>

                <option value="experience-asc">Experience: Low to High</option>
              </select>

              <span className="select-chevron" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </div>
          </div>

          <div className="control-divider" />

          {/* AVAILABILITY */}

          <div className="toggle-section">
            <span className="control-label">Availability</span>

            <label className="toggle-switch-container">
              <input
                type="checkbox"
                checked={onDuty}
                onChange={(event) => handleOnDutyChange(event.target.checked)}
                className="toggle-input"
              />

              <span className="toggle-slider" aria-hidden="true" />

              <span className="toggle-label-text">On Duty</span>
            </label>
          </div>
        </div>

        {/* ==================================================
            ACTIVE ON DUTY STAT
        ================================================== */}

        <button
          type="button"
          className={`active-duty-card ${onDuty ? 'active-filter' : ''}`}
          onClick={() => handleOnDutyChange(!onDuty)}
          title={onDuty ? 'Show all doctors' : 'Show on-duty doctors only'}
        >
          <div className="active-duty-content">
            <span className="card-label">ACTIVE ON DUTY</span>

            <h2 className="card-stat">
              {activeOnDutyCount}

              <span className="stat-total"> / {totalDoctors}</span>
            </h2>

            <div className="trend-chip">
              <svg
                className="trend-icon"
                viewBox="0 0 24 24"
                width="12"
                height="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />

                <path d="M12 8v8" />

                <path d="M8 12h8" />
              </svg>

              <span>{onDuty ? 'Filtering active' : 'Click to filter'}</span>
            </div>
          </div>

          <div className="card-bg-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="76"
              height="76"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />

              <line x1="16" y1="2" x2="16" y2="6" />

              <line x1="8" y1="2" x2="8" y2="6" />

              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
        </button>
      </section>

      {/* ==================================================
          DOCTORS
      ================================================== */}

      <section className="doctor-list-section" aria-label="Doctors list">
        {loading ? <InlineLoader /> : <DoctorList doctors={doctors} />}
      </section>

      {/* ==================================================
          CREATE DOCTOR MODAL
      ================================================== */}

      <CreateDoctorModal
        onSuccess={fetchDoctors}
        specializations={specializations}
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
}
