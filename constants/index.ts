type District = {
  name: string;
  postalCode: string;
};

export const LIMA_DISTRICTS: District[] = [
  { name: "Ancón", postalCode: "15123" },
  { name: "Ate", postalCode: "15022" },
  { name: "Barranco", postalCode: "15063" },
  { name: "Breña", postalCode: "15082" },
  { name: "Carabayllo", postalCode: "15121" },
  { name: "Chaclacayo", postalCode: "15472" },
  { name: "Chorrillos", postalCode: "15067" },
  { name: "Cieneguilla", postalCode: "15593" },
  { name: "Comas", postalCode: "15314" },
  { name: "El Agustino", postalCode: "15006" },
  { name: "Independencia", postalCode: "15311" },
  { name: "Jesús María", postalCode: "15072" },
  { name: "La Molina", postalCode: "15024" },
  { name: "La Victoria", postalCode: "15033" },
  { name: "Lima", postalCode: "15001" },
  { name: "Lince", postalCode: "15046" },
  { name: "Los Olivos", postalCode: "15301" },
  { name: "Lurigancho", postalCode: "15419" },
  { name: "Lurín", postalCode: "15841" },
  { name: "Magdalena del Mar", postalCode: "15076" },
  { name: "Miraflores", postalCode: "15074" },
  { name: "Pachacámac", postalCode: "15823" },
  { name: "Pucusana", postalCode: "15866" },
  { name: "Pueblo Libre", postalCode: "15084" },
  { name: "Puente Piedra", postalCode: "15118" },
  { name: "Punta Hermosa", postalCode: "15841" },
  { name: "Punta Negra", postalCode: "15842" },
  { name: "Rímac", postalCode: "15152" },
  { name: "San Bartolo", postalCode: "15856" },
  { name: "San Borja", postalCode: "15037" },
  { name: "San Isidro", postalCode: "15073" },
  { name: "San Juan de Lurigancho", postalCode: "15401" },
  { name: "San Juan de Miraflores", postalCode: "15801" },
  { name: "San Luis", postalCode: "15021" },
  { name: "San Martín de Porres", postalCode: "15102" },
  { name: "San Miguel", postalCode: "15086" },
  { name: "Santa Anita", postalCode: "15009" },
  { name: "Santa María del Mar", postalCode: "15854" },
  { name: "Santa Rosa", postalCode: "15122" },
  { name: "Santiago de Surco", postalCode: "15039" },
  { name: "Surquillo", postalCode: "15047" },
  { name: "Villa El Salvador", postalCode: "15834" },
  { name: "Villa María del Triunfo", postalCode: "15816" }
];

export const SizeOptions = ["pequeño", "mediano", "grande"];

export const PetGenderOptions = ["macho", "hembra"];

export const GenderOptions = ["masculino", "femenino", "otro"];

export const AdoptionStatusOptions = ["disponible", "adoptado"];

export const RevisionStatusOptions = ["pendiente", "revisado", "removido"];

export const SpeciesOptions = ["perro", "gato", "otro"];

export const ProfileFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: LIMA_DISTRICTS[0].name,
  profilePic: [],
  isCaretaker: false,
  gender: "masculino" as Gender,
};

export const PetFormDefaultValues = {
  name: "",
  species: "perro" as Species,
  breed: "",
  age: 0,
  size: "mediano" as Size,
  gender: "macho" as PetGender,
  status: "disponible" as AdoptionStatus,
  description: "",
  photos: [],
  location: LIMA_DISTRICTS[0].name,
  birthDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 2),
  createdAt: new Date(Date.now()),
};

export const StatusIcon = {
  pending: "/assets/icons/pending.svg",
  reviewed: "/assets/icons/check.svg",
  removed: "/assets/icons/cancelled.svg",
};
