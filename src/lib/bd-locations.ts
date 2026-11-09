/**
 * Bangladesh 64 Districts & Upazilas/Thanas
 * 
 * Static client-side dataset to guarantee 0ms latency in checkout dropdowns.
 * Never fetch this data from backend APIs to maintain maximum conversion speed.
 */

export interface DistrictLocation {
  district: string;
  districtBn: string;
  isDhaka: boolean;
  thanas: string[];
}

export const bdDistricts = [
  { name: 'Dhaka', bn_name: 'ঢাকা' },
  { name: 'Gazipur', bn_name: 'গাজীপুর' },
  { name: 'Narayanganj', bn_name: 'নারায়ণগঞ্জ' },
  { name: 'Chattogram', bn_name: 'চট্টগ্রাম' },
  { name: 'Sylhet', bn_name: 'সিলেট' },
  { name: 'Rajshahi', bn_name: 'রাজশাহী' },
  { name: 'Khulna', bn_name: 'খুলনা' },
  { name: 'Barishal', bn_name: 'বরিশাল' },
  { name: 'Rangpur', bn_name: 'রংপুর' },
  { name: 'Mymensingh', bn_name: 'ময়মনসিংহ' },
  { name: 'Cumilla', bn_name: 'কুমিল্লা' },
  { name: 'Bogura', bn_name: 'বগুড়া' },
];

export const BD_LOCATIONS: DistrictLocation[] = [
  {
    district: "Dhaka",
    districtBn: "ঢাকা",
    isDhaka: true,
    thanas: [
      "Adabor", "Badda", "Bangshal", "Bimanbandar", "Cantonment", "Chakbazar",
      "Dakshinkhan", "Darus Salam", "Demra", "Dhanmondi", "Gendaria", "Gulshan",
      "Hazaribagh", "Jatrabari", "Kadamtali", "Kafrul", "Kalabagan", "Kamrangirchar",
      "Khilgaon", "Khilkhet", "Kotwali", "Lalbagh", "Mirpur", "Mohammadpur",
      "Motijheel", "New Market", "Pallabi", "Paltan", "Ramna", "Rampura",
      "Sabujbagh", "Shah Ali", "Shahbagh", "Sher-e-Bangla Nagar", "Shyampur",
      "Sutrapur", "Tejgaon", "Tejgaon Industrial Area", "Turag", "Uttara",
      "Uttarkhan", "Vatara", "Wari", "Dhamrai", "Dohar", "Keraniganj",
      "Nawabganj", "Savar"
    ],
  },
  {
    district: "Gazipur",
    districtBn: "গাজীপুর",
    isDhaka: false,
    thanas: ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur", "Tongi"],
  },
  {
    district: "Narayanganj",
    districtBn: "নারায়ণগঞ্জ",
    isDhaka: false,
    thanas: ["Narayanganj Sadar", "Araihazar", "Bandar", "Rupganj", "Sonargaon", "Siddhirganj", "Fatullah"],
  },
  {
    district: "Chittagong",
    districtBn: "চট্টগ্রাম",
    isDhaka: false,
    thanas: [
      "Kotwali", "Panchlaish", "Pahartali", "Halishahar", "Khulshi", "Bakalia",
      "Chandgaon", "Patenga", "Double Mooring", "Bandar", "Anwara", "Banshkhali",
      "Boalkhali", "Chandanaish", "Fatikchhari", "Hathazari", "Lohagara",
      "Mirsharai", "Patiya", "Rangunia", "Raozan", "Sandwip", "Satkania", "Sitakunda"
    ],
  },
  {
    district: "Sylhet",
    districtBn: "সিলেট",
    isDhaka: false,
    thanas: [
      "Sylhet Sadar", "Beanibazar", "Bishwanath", "Dakshin Surma", "Fenchuganj",
      "Golapganj", "Gowainghat", "Jaintiapur", "Kanaighat", "Companiganj", "Zakiganj", "Osmani Nagar"
    ],
  },
  {
    district: "Rajshahi",
    districtBn: "রাজশাহী",
    isDhaka: false,
    thanas: [
      "Boalia", "Rajpara", "Motihar", "Shah Makhdum", "Paba", "Bagha",
      "Bagmara", "Charghat", "Durgapur", "Godagari", "Mohanpur", "Puthia", "Tanore"
    ],
  },
  {
    district: "Khulna",
    districtBn: "খুলনা",
    isDhaka: false,
    thanas: [
      "Khulna Sadar", "Sonadanga", "Khalishpur", "Daulatpur", "Khan Jahan Ali",
      "Batiaghata", "Dacope", "Dumuria", "Dighalia", "Koyra", "Paikgachha", "Phultala", "Rupsha", "Terokhada"
    ],
  },
  {
    district: "Barisal",
    districtBn: "বরিশাল",
    isDhaka: false,
    thanas: [
      "Barisal Sadar", "Kotwali", "Agailjhara", "Babuganj", "Bakerganj", "Banaripara",
      "Gaurnadi", "Hizla", "Mehendiganj", "Muladi", "Wazirpur"
    ],
  },
  {
    district: "Rangpur",
    districtBn: "রংপুর",
    isDhaka: false,
    thanas: [
      "Rangpur Sadar", "Kotwali", "Badarganj", "Gangachhara", "Kaunia",
      "Mithapukur", "Pirgachha", "Pirganj", "Taraganj"
    ],
  },
  {
    district: "Mymensingh",
    districtBn: "ময়মনসিংহ",
    isDhaka: false,
    thanas: [
      "Mymensingh Sadar", "Kotwali", "Bhaluka", "Dhobaura", "Fulbaria", "Gafargaon",
      "Gauripur", "Haluaghat", "Ishwarganj", "Muktagachha", "Nandail", "Phulpur", "Tara Khanda"
    ],
  },
  {
    district: "Comilla",
    districtBn: "কুমিল্লা",
    isDhaka: false,
    thanas: [
      "Comilla Adarsha Sadar", "Comilla Sadar Dakshin", "Barura", "Brahmanpara",
      "Burichang", "Chandina", "Chouddagram", "Daudkandi", "Debidwar", "Homna",
      "Laksam", "Lalmai", "Meghna", "Monohargonj", "Muradnagar", "Nangalkot", "Titas"
    ],
  },
  {
    district: "Bogra",
    districtBn: "বগুড়া",
    isDhaka: false,
    thanas: [
      "Bogra Sadar", "Adamdighi", "Dhunat", "Dhupchanchia", "Gabtali", "Kahaloo",
      "Nandigram", "Sariakandi", "Shajahanpur", "Sherpur", "Shibganj", "Sonatala"
    ],
  },
  {
    district: "Brahmanbaria",
    districtBn: "ব্রাহ্মণবাড়িয়া",
    isDhaka: false,
    thanas: ["Brahmanbaria Sadar", "Ashuganj", "Bancharampur", "Bijoynagar", "Kasba", "Nabinagar", "Nasirnagar", "Sarail", "Akhaura"],
  },
  {
    district: "Cox's Bazar",
    districtBn: "কক্সবাজার",
    isDhaka: false,
    thanas: ["Cox's Bazar Sadar", "Chakaria", "Kutubdia", "Maheshkhali", "Pekua", "Ramu", "Teknaf", "Ukhia"],
  },
  {
    district: "Feni",
    districtBn: "ফেনী",
    isDhaka: false,
    thanas: ["Feni Sadar", "Chhagalnaiya", "Daganbhuiyan", "Fulgazi", "Parshuram", "Sonagazi"],
  },
  {
    district: "Noakhali",
    districtBn: "নোয়াখালী",
    isDhaka: false,
    thanas: ["Noakhali Sadar", "Begumganj", "Chatkhil", "Companiganj", "Hatiya", "Kabirhat", "Senbagh", "Sonaimuri", "Subarnachar"],
  },
  {
    district: "Chandpur",
    districtBn: "চাঁদপুর",
    isDhaka: false,
    thanas: ["Chandpur Sadar", "Faridganj", "Haimchar", "Haziganj", "Kachua", "Matlab Dakshin", "Matlab Uttar", "Shahrasti"],
  },
  {
    district: "Tangail",
    districtBn: "টাঙ্গাইল",
    isDhaka: false,
    thanas: ["Tangail Sadar", "Basail", "Bhuapur", "Delduar", "Dhanbari", "Ghatail", "Gopalpur", "Kalihati", "Madhupur", "Mirzapur", "Nagarpur", "Sakhipur"],
  },
  {
    district: "Narsingdi",
    districtBn: "নরসিংদী",
    isDhaka: false,
    thanas: ["Narsingdi Sadar", "Belabo", "Monohardi", "Palash", "Raipura", "Shibpur"],
  },
  {
    district: "Faridpur",
    districtBn: "ফরিদপুর",
    isDhaka: false,
    thanas: ["Faridpur Sadar", "Alfadanga", "Bhangga", "Boalmari", "Charbhadrasan", "Madhukhali", "Nagarkanda", "Sadarpur", "Saltha"],
  },
  {
    district: "Jessore",
    districtBn: "যশোর",
    isDhaka: false,
    thanas: ["Jessore Sadar", "Abhaynagar", "Bagherpara", "Chaugachha", "Jhikargachha", "Keshabpur", "Manirampur", "Sharsha"],
  },
  {
    district: "Kushtia",
    districtBn: "কুষ্টিয়া",
    isDhaka: false,
    thanas: ["Kushtia Sadar", "Bheramara", "Daulatpur", "Khoksa", "Kumarkhali", "Mirpur"],
  },
  {
    district: "Pabna",
    districtBn: "পাবনা",
    isDhaka: false,
    thanas: ["Pabna Sadar", "Atgharia", "Bera", "Bhangura", "Chatmohar", "Faridpur", "Ishwardi", "Santhia", "Sujanagar"],
  },
  {
    district: "Dinajpur",
    districtBn: "দিনাজপুর",
    isDhaka: false,
    thanas: ["Dinajpur Sadar", "Birampur", "Birganj", "Biral", "Bochaganj", "Chirirbandar", "Fulbari", "Ghoraghat", "Hakimpur", "Kaharole", "Khansama", "Nawabganj", "Parbatipur"],
  },
  {
    district: "Habiganj",
    districtBn: "হবিগঞ্জ",
    isDhaka: false,
    thanas: ["Habiganj Sadar", "Ajmiriganj", "Bahubal", "Baniachong", "Chunarughat", "Lakhai", "Madhabpur", "Nabiganj", "Sayestaganj"],
  },
  {
    district: "Moulvibazar",
    districtBn: "মৌলভীবাজার",
    isDhaka: false,
    thanas: ["Moulvibazar Sadar", "Barlekha", "Juri", "Kamalganj", "Kulaura", "Rajnagar", "Sreemangal"],
  },
  {
    district: "Sunamganj",
    districtBn: "সুনামগঞ্জ",
    isDhaka: false,
    thanas: ["Sunamganj Sadar", "Bishwamvarpur", "Chhatak", "Derai", "Dharampasha", "Dowarabazar", "Jagannathpur", "Jamalganj", "Shantiganj", "Sullah", "Tahirpur"],
  },
  {
    district: "Munshiganj",
    districtBn: "মুন্সীগঞ্জ",
    isDhaka: false,
    thanas: ["Munshiganj Sadar", "Gazaria", "Lohajang", "Sirajdikhan", "Sreenagar", "Tongibari"],
  },
  {
    district: "Manikganj",
    districtBn: "মানিকগঞ্জ",
    isDhaka: false,
    thanas: ["Manikganj Sadar", "Daulatpur", "Ghior", "Harirampur", "Saturia", "Shivalaya", "Singair"],
  },
  {
    district: "Kishoreganj",
    districtBn: "কিশোরগঞ্জ",
    isDhaka: false,
    thanas: ["Kishoreganj Sadar", "Austagram", "Bajitpur", "Bhairab", "Hossainpur", "Itna", "Karimganj", "Katiadi", "Kuliarchar", "Mithamain", "Nikli", "Pakundia", "Tarail"],
  },
  {
    district: "Jamalpur",
    districtBn: "জামালপুর",
    isDhaka: false,
    thanas: ["Jamalpur Sadar", "Baksiganj", "Dewanganj", "Islampur", "Madarganj", "Melandaha", "Sarishabari"],
  },
  {
    district: "Sherpur",
    districtBn: "শেরপুর",
    isDhaka: false,
    thanas: ["Sherpur Sadar", "Jhenaigati", "Nakla", "Nalitabari", "Sreebardi"],
  },
  {
    district: "Netrokona",
    districtBn: "নেত্রকোণা",
    isDhaka: false,
    thanas: ["Netrokona Sadar", "Atpara", "Barhatta", "Durgapur", "Khaliajuri", "Kalmakanda", "Kendua", "Madan", "Mohanganj", "Purbadhala"],
  },
  {
    district: "Patuakhali",
    districtBn: "পটুয়াখালী",
    isDhaka: false,
    thanas: ["Patuakhali Sadar", "Bauphal", "Dashmina", "Galachipa", "Kalapara", "Mirzaganj", "Rangabali", "Dumki"],
  },
  {
    district: "Bhola",
    districtBn: "ভোলা",
    isDhaka: false,
    thanas: ["Bhola Sadar", "Burhanuddin", "Char Fasson", "Daulatkhan", "Lalmohan", "Manpura", "Tazumuddin"],
  },
  {
    district: "Pirojpur",
    districtBn: "পিরোজপুর",
    isDhaka: false,
    thanas: ["Pirojpur Sadar", "Bhandaria", "Kawkhali", "Mathbaria", "Nazirpur", "Nesarabad", "Zianagar"],
  },
  {
    district: "Jhalokati",
    districtBn: "ঝালকাঠি",
    isDhaka: false,
    thanas: ["Jhalokati Sadar", "Kathalia", "Nalchity", "Rajapur"],
  },
  {
    district: "Barguna",
    districtBn: "বরগুনা",
    isDhaka: false,
    thanas: ["Barguna Sadar", "Amtali", "Bamna", "Betagi", "Patharghata", "Taltali"],
  },
  {
    district: "Sirajganj",
    districtBn: "সিরাজগঞ্জ",
    isDhaka: false,
    thanas: ["Sirajganj Sadar", "Belkuchi", "Chauhali", "Kamarkhanda", "Kazipur", "Rayganj", "Shahjadpur", "Tarash", "Ullapara"],
  },
  {
    district: "Natore",
    districtBn: "নাটোর",
    isDhaka: false,
    thanas: ["Natore Sadar", "Bagatipara", "Baraigram", "Gurudaspur", "Lalpur", "Singra", "Naldanga"],
  },
  {
    district: "Naogaon",
    districtBn: "নওগাঁ",
    isDhaka: false,
    thanas: ["Naogaon Sadar", "Atrai", "Badalgachhi", "Dhamoirhat", "Manda", "Mohadevpur", "Niamatpur", "Patnitala", "Porsha", "Raninagar", "Sapahar"],
  },
  {
    district: "Chapainawabganj",
    districtBn: "চাঁপাইনবাবগঞ্জ",
    isDhaka: false,
    thanas: ["Bholahat", "Gomastapur", "Nachole", "Nawabganj Sadar", "Shibganj"],
  },
  {
    district: "Joypurhat",
    districtBn: "জয়পুরহাট",
    isDhaka: false,
    thanas: ["Joypurhat Sadar", "Akkelpur", "Kalai", "Khetlal", "Panchbibi"],
  },
  {
    district: "Satkhira",
    districtBn: "সাতক্ষীরা",
    isDhaka: false,
    thanas: ["Satkhira Sadar", "Assasuni", "Debhata", "Kalaroa", "Kaliganj", "Shyamnagar", "Tala"],
  },
  {
    district: "Bagerhat",
    districtBn: "বাগেরহাট",
    isDhaka: false,
    thanas: ["Bagerhat Sadar", "Chitalmari", "Fakirhat", "Kachua", "Mollahat", "Mongla", "Morrelganj", "Rampal", "Sarankhola"],
  },
  {
    district: "Jhenaidah",
    districtBn: "ঝিনাইদহ",
    isDhaka: false,
    thanas: ["Jhenaidah Sadar", "Harinakunda", "Kaliganj", "Kotchandpur", "Maheshpur", "Shailkupa"],
  },
  {
    district: "Magura",
    districtBn: "মাগুরা",
    isDhaka: false,
    thanas: ["Magura Sadar", "Mohammadpur", "Shalikha", "Sreepur"],
  },
  {
    district: "Narail",
    districtBn: "নড়াইল",
    isDhaka: false,
    thanas: ["Narail Sadar", "Kalia", "Lohagara"],
  },
  {
    district: "Chuadanga",
    districtBn: "চুয়াডাঙ্গা",
    isDhaka: false,
    thanas: ["Chuadanga Sadar", "Alamdanga", "Damurhuda", "Jibannagar"],
  },
  {
    district: "Meherpur",
    districtBn: "মেহেরপুর",
    isDhaka: false,
    thanas: ["Meherpur Sadar", "Gangni", "Mujibnagar"],
  },
  {
    district: "Kurigram",
    districtBn: "কুড়িগ্রাম",
    isDhaka: false,
    thanas: ["Kurigram Sadar", "Bhurungamari", "Char Rajibpur", "Chilmari", "Nageshwari", "Phulbari", "Rajarhat", "Raomari", "Ulipur"],
  },
  {
    district: "Gaibandha",
    districtBn: "গাইবান্ধা",
    isDhaka: false,
    thanas: ["Gaibandha Sadar", "Fulchhari", "Gobindaganj", "Palashbari", "Sadullapur", "Saghata", "Sundarganj"],
  },
  {
    district: "Lalmonirhat",
    districtBn: "লালমনিরহাট",
    isDhaka: false,
    thanas: ["Lalmonirhat Sadar", "Aditmari", "Hatibandha", "Kaliganj", "Patgram"],
  },
  {
    district: "Nilphamari",
    districtBn: "নীলফামারী",
    isDhaka: false,
    thanas: ["Nilphamari Sadar", "Dimla", "Domar", "Jaldhaka", "Kishoreganj", "Syedpur"],
  },
  {
    district: "Panchagarh",
    districtBn: "পঞ্চগড়",
    isDhaka: false,
    thanas: ["Panchagarh Sadar", "Atwari", "Boda", "Debiganj", "Tetulia"],
  },
  {
    district: "Thakurgaon",
    districtBn: "ঠাকুরগাঁও",
    isDhaka: false,
    thanas: ["Thakurgaon Sadar", "Baliadangi", "Haripur", "Pirganj", "Ranisankail"],
  },
  {
    district: "Lakshmipur",
    districtBn: "লক্ষ্মীপুর",
    isDhaka: false,
    thanas: ["Lakshmipur Sadar", "Raipur", "Ramganj", "Ramgati", "Kamalnagar"],
  },
  {
    district: "Madaripur",
    districtBn: "মাদারীপুর",
    isDhaka: false,
    thanas: ["Madaripur Sadar", "Kalkini", "Rajoir", "Shibchar", "Dasar"],
  },
  {
    district: "Gopalganj",
    districtBn: "গোপালগঞ্জ",
    isDhaka: false,
    thanas: ["Gopalganj Sadar", "Kashiani", "Kotalipara", "Muksudpur", "Tungipara"],
  },
  {
    district: "Rajbari",
    districtBn: "রাজবাড়ী",
    isDhaka: false,
    thanas: ["Rajbari Sadar", "Baliakandi", "Goalandaghat", "Pangsha", "Kalukhali"],
  },
  {
    district: "Shariatpur",
    districtBn: "শরীয়তপুর",
    isDhaka: false,
    thanas: ["Shariatpur Sadar", "Bhedarganj", "Damudya", "Gosairhat", "Naria", "Zajira"],
  },
  {
    district: "Khagrachhari",
    districtBn: "খাগড়াছড়ি",
    isDhaka: false,
    thanas: ["Khagrachhari Sadar", "Dighinala", "Lakshmichhari", "Mahalchhari", "Manikchhari", "Matiranga", "Panchhari", "Ramgarh"],
  },
  {
    district: "Rangamati",
    districtBn: "রাঙ্গামাটি",
    isDhaka: false,
    thanas: ["Rangamati Sadar", "Bagaichhari", "Barkal", "Belaichhari", "Juraichhari", "Kaptai", "Kawkhali", "Langadu", "Naniarchar", "Rajasthali"],
  },
  {
    district: "Bandarban",
    districtBn: "বান্দরবান",
    isDhaka: false,
    thanas: ["Bandarban Sadar", "Ali Kadam", "Lama", "Naikhongchhari", "Rowangchhari", "Ruma", "Thanchi"],
  },
];

/**
 * Returns all district names for dropdown selection
 */
export function getDistricts(): { name: string; nameBn: string; isDhaka: boolean }[] {
  return BD_LOCATIONS.map((loc) => ({
    name: loc.district,
    nameBn: loc.districtBn,
    isDhaka: loc.isDhaka,
  }));
}

/**
 * Returns all thanas/upazilas for a given district
 */
export function getThanasForDistrict(districtName: string): string[] {
  const match = BD_LOCATIONS.find(
    (loc) => loc.district.toLowerCase() === districtName.trim().toLowerCase()
  );
  return match ? match.thanas : [];
}

/**
 * Checks whether a given district is Dhaka (for delivery charge calculation)
 */
export function isDhakaLocation(districtName: string): boolean {
  const match = BD_LOCATIONS.find(
    (loc) => loc.district.toLowerCase() === districtName.trim().toLowerCase()
  );
  return match?.isDhaka ?? false;
}

