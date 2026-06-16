import { useEffect, useState } from "react";
import DoctorList from "../../components/Doctor/DoctorList";
import { getDoctors } from "../../services/doctor.service";
import Loader from "../../../../components/common/Loader";
import type { Doctor } from "../../types/doctor.type";
import { useSearchParams } from "react-router-dom";
export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  
  // const [specialization,setSpecialization] = 
  // useState("");
  // const [sort, setSort] =
  // useState("");
  // const [onDutyOnly, setOnDutyOnly] =
  // useState(false);
  const [searchParams,setSearchParams] = useSearchParams();
  const specialization =
  searchParams.get("specialization") ?? "";

const sort =
  searchParams.get("sort") ?? "";

const onDuty =
  searchParams.get("onDuty") === "true";

  useEffect(() => {
    fetchDoctors();
  }, [searchParams]);

  const fetchDoctors = async () => {
    try {
      const data = await getDoctors({
        specialization:specialization || undefined,
        onDuty:searchParams.has("onDuty")?onDuty:undefined,
        sort:sort || undefined,
      });

      setDoctors(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader/>
  }

  const handleDepartmentChange = (
  value: string
) => {
  const params =
    new URLSearchParams(searchParams);

  if (value) {
    params.set(
      "specialization",
      value
    );
  } else {
    params.delete(
      "specialization"
    );
  }

  setSearchParams(params);
};

const handleSortChange = (
  value: string
) => {
  const params =
    new URLSearchParams(searchParams);

  if (value) {
    params.set("sort", value);
  } else {
    params.delete("sort");
  }

  setSearchParams(params);
};

const handleOnDutyChange = (
  checked: boolean
) => {
  const params =
    new URLSearchParams(searchParams);

  if (checked) {
    params.set("onDuty", "true");
  } else {
    params.delete("onDuty");
  }

  setSearchParams(params);
};

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <label className="flex items-center gap-2">
<input
  type="checkbox"
  checked={onDuty}
  onChange={(e) =>
    handleOnDutyChange(
      e.target.checked
    )
  }
/>

  On Duty Only
</label>
<select
  value={sort}
  onChange={(e) =>
    handleSortChange(
      e.target.value
    )
  }
>
  <option value="">
    Sort By
  </option>

  <option value="experience-desc">
    Experience High → Low
  </option>

  <option value="experience-asc">
    Experience Low → High
  </option>
</select>
      <select
  value={specialization}
  onChange={(e) =>
    handleDepartmentChange(
      e.target.value
    )
  }
>
  <option value="">
    All Departments
  </option>

  <option value="Cardiology">
    Cardiology
  </option>

  <option value="Pulmonology">
    Pulmonology
  </option>
</select>
        <h1 className="text-2xl font-bold">
          Doctors Directory
        </h1>

        <button>
          Add Doctor
        </button>
      </div>

      <DoctorList doctors={doctors} />
    </div>
  );
}