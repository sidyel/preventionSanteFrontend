export interface Department {
  name: string;
  communes: string[];
}

export interface Region {
  name: string;
  departments: Department[];
}

export const SENEGAL_REGIONS: Region[] = [
  {
    name: 'Dakar',
    departments: [
      {
        name: 'Dakar',
        communes: ['Almadies', 'Biscuiterie', 'Dieuppeul-Derklé', 'Fann-Point E-Amitié', 'Gueule Tapée-Fass-Colobane', 'Gorée', 'Grand Dakar', 'Grand Yoff', 'HLM', 'Médina', 'Ngor', 'Ouakam', 'Parcelles Assainies', 'Patte d\'Oie', 'Plateau', 'Sicap-Liberté', 'Yoff']
      },
      {
        name: 'Guédiawaye',
        communes: ['Golf Sud', 'Médina Gounass', 'Ndiarème Limamou Laye', 'Sam Notaire', 'Wakhinane Nimzatt']
      },
      {
        name: 'Pikine',
        communes: ['Dalifort', 'Djiddah Thiaroye Kao', 'Guinaw Rail Nord', 'Guinaw Rail Sud', 'Mbao', 'Pikine Est', 'Pikine Nord', 'Pikine Ouest', 'Thiaroye Gare', 'Thiaroye-sur-Mer', 'Tivaouane Diacksao', 'Yeumbeul Nord', 'Yeumbeul Sud']
      },
      {
        name: 'Rufisque',
        communes: ['Bargny', 'Diamniadio', 'Jaxaay-Parcelles-Niakoul Rap', 'Rufisque Est', 'Rufisque Nord', 'Rufisque Ouest', 'Sangalkam', 'Sébikotane', 'Sendou', 'Tivaouane Peul', 'Yène']
      }
    ]
  },
  {
    name: 'Thiès',
    departments: [
      {
        name: 'Thiès',
        communes: ['Thiès Est', 'Thiès Nord', 'Thiès Ouest']
      },
      {
        name: 'Mbour',
        communes: ['Mbour', 'Fissel', 'Joal-Fadiouth', 'Malicounda', 'Ngaparou', 'Sindia', 'Somone', 'Thiadiaye']
      },
      {
        name: 'Tivaouane',
        communes: ['Tivaouane', 'Mékhé', 'Niakhène', 'Pambal', 'Taïba Ndiaye']
      }
    ]
  },
  {
    name: 'Saint-Louis',
    departments: [
      {
        name: 'Saint-Louis',
        communes: ['Saint-Louis', 'Fass Ngom', 'Gandon', 'Mpal']
      },
      {
        name: 'Dagana',
        communes: ['Dagana', 'Bokhol', 'Mbane', 'Richard Toll', 'Ross Béthio']
      },
      {
        name: 'Podor',
        communes: ['Podor', 'Aéré Lao', 'Cas-Cas', 'Fanaye', 'Galoya', 'Gamadji Saré', 'Guédé Chantier', 'Mbolo Birane', 'Ndioum', 'Pété', 'Walaldé']
      }
    ]
  },
  {
    name: 'Diourbel',
    departments: [
      {
        name: 'Diourbel',
        communes: ['Diourbel', 'Ndoulo', 'Ngoye', 'Tocky Gare']
      },
      {
        name: 'Bambey',
        communes: ['Bambey', 'Baba Garage', 'Dinguiraye', 'Lambaye', 'Ngoye', 'Refane']
      },
      {
        name: 'Mbacké',
        communes: ['Mbacké', 'Darou Khoudoss', 'Kael', 'Ndame', 'Taïf']
      }
    ]
  },
  {
    name: 'Louga',
    departments: [
      {
        name: 'Louga',
        communes: ['Louga', 'Coki', 'Kébémer', 'Sakal']
      },
      {
        name: 'Linguère',
        communes: ['Linguère', 'Barkédji', 'Dodji', 'Sagatta Djoloff', 'Yang Yang']
      },
      {
        name: 'Kébémer',
        communes: ['Kébémer', 'Dahra', 'Leur Esani', 'Ndande']
      }
    ]
  },
  {
    name: 'Fatick',
    departments: [
      {
        name: 'Fatick',
        communes: ['Fatick', 'Diakhao', 'Fimela', 'Loul Sessène', 'Palmarin', 'Tattaguine']
      },
      {
        name: 'Foundiougne',
        communes: ['Foundiougne', 'Djilor', 'Karang', 'Niodior', 'Passy', 'Sokone', 'Soum', 'Toubacouta']
      },
      {
        name: 'Gossas',
        communes: ['Gossas', 'Colobane', 'Mbar', 'Ouadiour', 'Patar']
      }
    ]
  },
  {
    name: 'Kaolack',
    departments: [
      {
        name: 'Kaolack',
        communes: ['Kaolack', 'Latmingué', 'Ndoffane', 'Sibassor']
      },
      {
        name: 'Guinguinéo',
        communes: ['Guinguinéo', 'Fao', 'Mbadakhoune', 'Ngayène']
      },
      {
        name: 'Nioro du Rip',
        communes: ['Nioro du Rip', 'Dabaly', 'Gainté Kaye', 'Keur Baka', 'Médina Sabakh', 'Paoskoto', 'Wack Ngouna']
      }
    ]
  },
  {
    name: 'Kaffrine',
    departments: [
      {
        name: 'Kaffrine',
        communes: ['Kaffrine', 'Gniby', 'Kahi', 'Nganda']
      },
      {
        name: 'Birkelane',
        communes: ['Birkelane', 'Mabo', 'Touba Mosquée']
      },
      {
        name: 'Koungheul',
        communes: ['Koungheul', 'Ida Mouride', 'Lour Escale', 'Missirah', 'Richar']
      },
      {
        name: 'Malem-Hodar',
        communes: ['Malem-Hodar', 'Darou Minam', 'Katakel', 'Ndioum Ngainthe']
      }
    ]
  },
  {
    name: 'Tambacounda',
    departments: [
      {
        name: 'Tambacounda',
        communes: ['Tambacounda', 'Koumpentoum', 'Makacoulibantang', 'Missirah', 'Netteboulou']
      },
      {
        name: 'Bakel',
        communes: ['Bakel', 'Ballou', 'Diawara', 'Goudiry', 'Kidira', 'Moudery']
      },
      {
        name: 'Goudiry',
        communes: ['Goudiry', 'Bélé', 'Dougué', 'Kothiary', 'Sinthiou Malème']
      },
      {
        name: 'Koumpentoum',
        communes: ['Koumpentoum', 'Bamba Thialène', 'Kahène', 'Kouthiaba Wolof', 'Payar']
      }
    ]
  },
  {
    name: 'Kédougou',
    departments: [
      {
        name: 'Kédougou',
        communes: ['Kédougou', 'Bandafassi', 'Dindéfélo', 'Fongolimbi']
      },
      {
        name: 'Salémata',
        communes: ['Salémata', 'Dakateli', 'Ethiolo', 'Tomboronkoto']
      },
      {
        name: 'Saraya',
        communes: ['Saraya', 'Bembou', 'Khossanto', 'Médina Baffe']
      }
    ]
  },
  {
    name: 'Kolda',
    departments: [
      {
        name: 'Kolda',
        communes: ['Kolda', 'Bagadadji', 'Coumbacara', 'Dabo', 'Mampatim', 'Médina Yoro Foulah', 'Salikégné', 'Tankanto Escale']
      },
      {
        name: 'Vélingara',
        communes: ['Vélingara', 'Bonconto', 'Dioulacolon', 'Diyabougou', 'Kounkané', 'Linkering', 'Ouassadou', 'Pakour', 'Paroumba']
      },
      {
        name: 'Médina Yoro Foulah',
        communes: ['Médina Yoro Foulah', 'Bignarabé', 'Fafacourou', 'Pata']
      }
    ]
  },
  {
    name: 'Ziguinchor',
    departments: [
      {
        name: 'Ziguinchor',
        communes: ['Ziguinchor', 'Adéane', 'Boutoupa-Camaracounda', 'Enampore', 'Niaguis', 'Nyassia']
      },
      {
        name: 'Bignona',
        communes: ['Bignona', 'Diouloulou', 'Kafountine', 'Kataba 1', 'Sindian', 'Tendouck', 'Thionck-Essyl']
      },
      {
        name: 'Oussouye',
        communes: ['Oussouye', 'Diembéring', 'Loudia Ouoloff', 'Mlomp', 'Santhiaba Manjacque']
      }
    ]
  },
  {
    name: 'Sédhiou',
    departments: [
      {
        name: 'Sédhiou',
        communes: ['Sédhiou', 'Diendé', 'Djiredji', 'Marsassoum']
      },
      {
        name: 'Bounkiling',
        communes: ['Bounkiling', 'Diaroumé', 'Médina Wandifa', 'Ndiamalathiel']
      },
      {
        name: 'Goudomp',
        communes: ['Goudomp', 'Diattacounda', 'Karantaba', 'Samine']
      }
    ]
  },
  {
    name: 'Matam',
    departments: [
      {
        name: 'Matam',
        communes: ['Matam', 'Dabia', 'Nabadji Civol', 'Ogo', 'Thilogne']
      },
      {
        name: 'Kanel',
        communes: ['Kanel', 'Dembancané', 'Ndendory', 'Orkadieré', 'Semme', 'Wouro Sidy']
      },
      {
        name: 'Ranérou',
        communes: ['Ranérou', 'Lougré Thioly', 'Oudalaye', 'Vélingara']
      }
    ]
  }
];

export function getRegionNames(): string[] {
  return SENEGAL_REGIONS.map(region => region.name);
}

export function getDepartmentsByRegion(regionName: string): string[] {
  const region = SENEGAL_REGIONS.find(r => r.name === regionName);
  return region ? region.departments.map(dept => dept.name) : [];
}

export function getCommunesByDepartment(regionName: string, departmentName: string): string[] {
  const region = SENEGAL_REGIONS.find(r => r.name === regionName);
  if (!region) return [];

  const department = region.departments.find(d => d.name === departmentName);
  return department ? department.communes : [];
}

export function getAllCommunes(): string[] {
  const communes: string[] = [];
  SENEGAL_REGIONS.forEach(region => {
    region.departments.forEach(department => {
      communes.push(...department.communes);
    });
  });
  return communes.sort();
}
