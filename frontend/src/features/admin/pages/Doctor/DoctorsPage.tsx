import { useEffect, useState } from "react";
import DoctorList from "../../components/Doctor/DoctorList";
import { getDoctors } from "../../services/doctor.service";
import Loader from "../../../../components/common/Loader";
import InlineLoader from "../../../../components/common/InlineLoader";
import type { Doctor } from "../../types/doctor.type";
import { useSearchParams } from "react-router-dom";
import type { Specialization } from "../../types/specialization.types";
import "./DoctorsPage.css";
import { getSpecialization } from "../../services/getSpecialization.service";
import CreateDoctorModal from "../../components/Doctor/CreateDoctorModal";


export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [initialLoading, setInitialLoading] =
  useState(true);

  const [specializations, setSpecializations] = useState<Specialization[]>([])
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSpecializations =
    searchParams.get("specialization")?.split(",") ?? [];
  const sort = searchParams.get("sort") ?? "";
  const onDuty = searchParams.get("onDuty") === "true";

  useEffect(() => {
    fetchDoctors();
    fetchSpecialization();
  }, [searchParams]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const data = await getDoctors({
        specializations:
          selectedSpecializations.length
            ? selectedSpecializations
            : undefined,

        onDuty: searchParams.has("onDuty")
          ? onDuty
          : undefined,

        sort: sort || undefined,
      });
      setDoctors(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  const fetchSpecialization = async () => {
    const data = await getSpecialization();
    setSpecializations(data);
  }


  const handleSpecializationChange = (
    value: string
  ) => {
    const params = new URLSearchParams(
      searchParams
    );

    let selected = [
      ...selectedSpecializations,
    ];

    if (selected.includes(value)) {
      selected = selected.filter(
        (item) => item !== value
      );
    } else {
      selected.push(value);
    }

    if (selected.length) {
      params.set(
        "specialization",
        selected.join(",")
      );
    } else {
      params.delete("specialization");
    }

    setSearchParams(params);
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    setSearchParams(params);
  };

  const handleOnDutyChange = (checked: boolean) => {
    const params = new URLSearchParams(searchParams);
    if (checked) {
      params.set("onDuty", "true");
    } else {
      params.delete("onDuty");
    }
    setSearchParams(params);
  };

  const totalDoctors = doctors.length;
  const activeOnDutyCount = doctors.filter(d => d.onDuty).length;

if (initialLoading) {
  return <Loader />;
}
  return (
    <div className="doctors-page-container">
      {/* Header Section */}
      <div className="directory-header">
        <div className="header-left-info">
          <div className="meta-badge">
            <svg className="meta-icon" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span>MEDICAL STAFF</span>
          </div>
          <h1 className="directory-title">Doctors Directory</h1>
          <p className="directory-subtitle">
            Manage and monitor {totalDoctors} specialized doctors across all departments.
          </p>
        </div>

        <div className="header-right-actions">
          <button className="btn-secondary-custom">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export List
          </button>
          <button
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
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>

            Add Doctor
          </button>
        </div>
      </div>

      {/* Filters & Stats Layout Row */}
      <div className="filters-stats-row">
        <div className="directory-controls-card">
          <div className="department-filter-section">
            <span className="control-label">Specialization Filter</span>
            <div className="filter-pills-container">
              <button
                className={`filter-pill ${selectedSpecializations.length === 0
                    ? "active"
                    : ""
                  }`}
                onClick={() => {
                  const params =
                    new URLSearchParams(
                      searchParams
                    );

                  params.delete(
                    "specialization"
                  );

                  setSearchParams(params);
                }}
              >
                All Units
              </button>

              {specializations.map((item) => (
                <button
                  key={item.id}
                  className={`filter-pill ${selectedSpecializations.includes(item.name)
                      ? "active"
                      : ""
                    }`}
                  onClick={() =>
                    handleSpecializationChange(item.name)
                  }
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="control-divider"></div>

          <div className="sort-section">
            <span className="control-label">Sort By</span>
            <div className="sort-select-wrapper">
              <select
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="custom-select"
              >
                <option value="">Sort Option</option>
                <option value="experience-desc">Experience High → Low</option>
                <option value="experience-asc">Experience Low → High</option>
              </select>
              <span className="select-chevron">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
            </div>
          </div>

          <div className="control-divider"></div>

          <div className="toggle-section">
            <span className="control-label">Status Filter</span>
            <label className="toggle-switch-container">
              <input
                type="checkbox"
                checked={onDuty}
                onChange={(e) => handleOnDutyChange(e.target.checked)}
                className="toggle-input"
              />
              <span className="toggle-slider"></span>
              <span className="toggle-label-text">On Duty Only</span>
            </label>
          </div>
        </div>

        {/* Active On Duty Stats Card */}
        <div
          className={`active-duty-card ${onDuty ? "active-filter" : ""}`}
          onClick={() => handleOnDutyChange(!onDuty)}
          style={{ cursor: "pointer" }}
          title={onDuty ? "Click to show all doctors" : "Click to filter on-duty doctors only"}
        >
          <div className="active-duty-content">
            <span className="card-label">ACTIVE ON DUTY</span>
            <h2 className="card-stat">
              {activeOnDutyCount} <span className="stat-total">/ {totalDoctors}</span>
            </h2>
            <div className="trend-chip">
              <svg className="trend-icon" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
              <span>{onDuty ? "Filtering Active" : "+12% from last week"}</span>
            </div>
          </div>
          <div className="card-bg-icon">
            <svg viewBox="0 0 24 24" width="76" height="76" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
        </div>
      </div>

      {/* Grid of Doctor Cards */}
      <div className="doctor-list-section">
{loading ? (
  <InlineLoader />
) : (
  <DoctorList doctors={doctors} />
)}
</div>

      <CreateDoctorModal onSuccess={fetchDoctors} specializations={specializations} isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </div>
  );
}