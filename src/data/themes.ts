export interface Mp3Track {
  title: string;
  artist: string;
  durationSec: number;
  durationStr: string;
  artwork: string;
  audioSrc: string;
}

export interface YouTubeTrack {
  id: string;
  title: string;
  artist: string;
  duration: number;
  durationStr: string;
  cover: string;
}

export type Track = Mp3Track | YouTubeTrack;

export interface Theme {
  id: string;
  name: string;
  audioSource: "mp3" | "youtube";
  playerStyle: "glass-pill" | "truck-disc";
  background: string;
  bgLayers?: string[];
  tracks: Track[];
  fontFamily?: string;
}

const RM_BASE = "https://raju-mistri-playlist.pages.dev";

const rajuMistriTracks: Mp3Track[] = [
  {
    title: "Abhi to Mohabbat Ka (From Hum Ho Gaye Aap Ke)",
    artist: "Satrang Music / Raju Mistri",
    durationSec: 318,
    durationStr: "5:18",
    artwork: `${RM_BASE}/covers/cover_0.jpg`,
    audioSrc: `${RM_BASE}/audio/track_0.mp3`,
  },
  {
    title: "Ae Mere Humsafar",
    artist: "Satrang Music / Raju Mistri",
    durationSec: 351,
    durationStr: "5:51",
    artwork: `${RM_BASE}/covers/cover_1.jpg`,
    audioSrc: `${RM_BASE}/audio/track_1.mp3`,
  },
  {
    title: "Chaaha Toh Bahut",
    artist: "Satrang Music / Raju Mistri",
    durationSec: 467,
    durationStr: "7:47",
    artwork: `${RM_BASE}/covers/cover_2.jpg`,
    audioSrc: `${RM_BASE}/audio/track_2.mp3`,
  },
  {
    title: "Chura Ke Dil Mera",
    artist: "Satrang Music / Raju Mistri",
    durationSec: 474,
    durationStr: "7:54",
    artwork: `${RM_BASE}/covers/cover_3.jpg`,
    audioSrc: `${RM_BASE}/audio/track_3.mp3`,
  },
  {
    title: "Dil Cheer Ke Dekh",
    artist: "Satrang Music / Raju Mistri",
    durationSec: 310,
    durationStr: "5:10",
    artwork: `${RM_BASE}/covers/cover_4.jpg`,
    audioSrc: `${RM_BASE}/audio/track_4.mp3`,
  },
  {
    title: "Hum Yaar Hai Tumhare",
    artist: "Satrang Music / Raju Mistri",
    durationSec: 434,
    durationStr: "7:14",
    artwork: `${RM_BASE}/covers/cover_5.jpg`,
    audioSrc: `${RM_BASE}/audio/track_5.mp3`,
  },
  {
    title: "Is Pyar Se Meri Taraf Na Dekho - Duet Version",
    artist: "Satrang Music / Raju Mistri",
    durationSec: 321,
    durationStr: "5:21",
    artwork: `${RM_BASE}/covers/cover_6.jpg`,
    audioSrc: `${RM_BASE}/audio/track_6.mp3`,
  },
  {
    title: "Kitna Haseen Chehra (From Dilwale)",
    artist: "Satrang Music / Raju Mistri",
    durationSec: 354,
    durationStr: "5:54",
    artwork: `${RM_BASE}/covers/cover_7.jpg`,
    audioSrc: `${RM_BASE}/audio/track_7.mp3`,
  },
  {
    title: "Mujhse Mohabbat Ka",
    artist: "Satrang Music / Raju Mistri",
    durationSec: 312,
    durationStr: "5:12",
    artwork: `${RM_BASE}/covers/cover_8.jpg`,
    audioSrc: `${RM_BASE}/audio/track_8.mp3`,
  },
  {
    title: "Raah Mein Unse Mulaqat",
    artist: "Satrang Music / Raju Mistri",
    durationSec: 519,
    durationStr: "8:39",
    artwork: `${RM_BASE}/covers/cover_9.jpg`,
    audioSrc: `${RM_BASE}/audio/track_9.mp3`,
  },
  {
    title: "Teri Umeed Tera Intezar",
    artist: "Satrang Music / Raju Mistri",
    durationSec: 378,
    durationStr: "6:18",
    artwork: `${RM_BASE}/covers/cover_10.jpg`,
    audioSrc: `${RM_BASE}/audio/track_10.mp3`,
  },
  {
    title: "Tu Pyar Hai Kisi Aur Ka",
    artist: "Satrang Music / Raju Mistri",
    durationSec: 408,
    durationStr: "6:48",
    artwork: `${RM_BASE}/covers/cover_11.jpg`,
    audioSrc: `${RM_BASE}/audio/track_11.mp3`,
  },
  {
    title: "Tumsa Koi Pyaara",
    artist: "Satrang Music / Raju Mistri",
    durationSec: 349,
    durationStr: "5:49",
    artwork: `${RM_BASE}/covers/cover_12.jpg`,
    audioSrc: `${RM_BASE}/audio/track_12.mp3`,
  },
  {
    title: "Woh Ladki Bahut Yaad Aati",
    artist: "Satrang Music / Raju Mistri",
    durationSec: 405,
    durationStr: "6:45",
    artwork: `${RM_BASE}/covers/cover_13.jpg`,
    audioSrc: `${RM_BASE}/audio/track_13.mp3`,
  },
];

function fmt(s: number): string {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

const truckWalaTracks: YouTubeTrack[] = [
  { id: "N0jnLZxYwYc", title: "Mujhse Mohabbat Ka Izhaar Karta", artist: "Satrang Music Official", duration: 304, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/d8/1f/fe/d81ffee2-15bd-5d17-7af0-a4794fa94547/cover.jpg/400x400bb.jpg", durationStr: "" },
  { id: "3NWMK2MRqIk", title: "Tumsa Koi Pyaara", artist: "Kumar Sanu & Alka Yagnik", duration: 376, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/a7/f5/c2/a7f5c2e5-d620-02de-4b50-8cc03364e246/8901854010462.jpg/400x400bb.jpg", durationStr: "" },
  { id: "9b0iydtDZLU", title: "Waada Raha Sanam", artist: "Abhijeet & Alka Yagnik", duration: 365, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/a5/2e/2a/a52e2a41-be71-2aaa-a3aa-8d6154f2367b/cover.jpg/400x400bb.jpg", durationStr: "" },
  { id: "fg9G1dacXjk", title: "Chhupana Bhi Nahin Aata", artist: "Vinod Rathod", duration: 253, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/35/29/aa/3529aae9-0f02-8c08-3fb7-2713553fcae4/cover.jpg/400x400bb.jpg", durationStr: "" },
  { id: "u0AgbGWvzdA", title: "Jhanjharia (Male Version)", artist: "Abhijeet", duration: 309, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/f4/74/56/f47456b6-f29e-b63a-faa8-1f3fef77b263/8901854010516.jpg/400x400bb.jpg", durationStr: "" },
  { id: "jE1CavSI5TQ", title: "Husn Hai Suhana", artist: "Chandana Dixit & Abhijeet", duration: 348, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/ff/34/8e/ff348e70-7747-05ca-1a54-d8f9174066bf/8901854009442.jpg/400x400bb.jpg", durationStr: "" },
  { id: "wYdXuNtJkPk", title: "Jeeye to Jeeye Kaise", artist: "Pankaj Udhas", duration: 217, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/af/c9/3e/afc93e0c-08e1-cc81-f549-a5fed7b95dd0/cover.jpg/400x400bb.jpg", durationStr: "" },
  { id: "cBGDDBHN22U", title: "Pehli Pehli Baar Mohabbat Ki Hai", artist: "Kumar Sanu & Alka Yagnik", duration: 457, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music60/v4/cd/6f/7c/cd6f7c21-ec35-353d-7762-bdd951d1e10b/8902894606318_cover.jpg/400x400bb.jpg", durationStr: "" },
  { id: "oFxbBeYhLqM", title: "Saaton Janam Main Tere", artist: "Kumar Sanu & Alka Yagnik", duration: 362, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/6c/3b/cd/6c3bcd60-c8b5-f39f-b294-1a7c11d2f1f4/cover.jpg/400x400bb.jpg", durationStr: "" },
  { id: "e-1xmmEb49I", title: "To Chalun", artist: "Roop Kumar Rathod", duration: 459, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/d7/20/98/d720985d-12f8-c7d2-73e5-5f2f16249de9/cover.jpg/400x400bb.jpg", durationStr: "" },
  { id: "7-ORLGKcnLQ", title: "Tumhein Dekhen Meri Aankhen", artist: "Alka Yagnik, P. Sunanda & Kumar Sanu", duration: 394, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/64/d3/7c/64d37cf6-4da6-6e16-6e39-cd9a5bb5e292/8901854011056.jpg/400x400bb.jpg", durationStr: "" },
  { id: "tPNwGuu_rQ4", title: "Tumhein Apna Banane Ki Kasam Khai Hai (From \"Sadak\")", artist: "Anuradha Paudwal & Kumar Sanu", duration: 337, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/b8/1d/7b/b81d7b77-4bfa-59b9-74f5-def45157f386/8903431040985_cover.jpg/400x400bb.jpg", durationStr: "" },
  { id: "dDR4oiyjUBA", title: "Raah Mein Unse Mulaqat", artist: "Kumar Sanu & Alka Yagnik", duration: 456, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/76/d6/62/76d66293-50b1-4cb9-f5d0-b4acb5fc52cd/8901854004560.jpg/400x400bb.jpg", durationStr: "" },
  { id: "tRMzF4EVPHI", title: "Tu Jo Hans Hans Ke (From \"Raja Bhaiya\")", artist: "Udit Narayan & Kavita Krishnamurthy", duration: 254, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/c4/a8/14/c4a8144a-9357-5140-7d81-3071139d485c/23UMGIM77992.rgb.jpg/400x400bb.jpg", durationStr: "" },
  { id: "PqiddY3o3aY", title: "Dil Kehta Hai", artist: "Kumar Sanu & Alka Yagnik", duration: 403, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/88/5b/ac/885baca2-62b6-7624-da86-4226fed6c2bf/cover.jpg/400x400bb.jpg", durationStr: "" },
  { id: "Jtg2zyS_y_c", title: "Ae Kash Ke Hum", artist: "Jatin-Lalit & Kumar Sanu", duration: 296, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e6/d6/0a/e6d60a7a-e6ee-6824-7e04-8739f0aa9f4e/5099749530828.jpg/400x400bb.jpg", durationStr: "" },
  { id: "lFdSi01tpYM", title: "Sochenge Tumhe Pyar", artist: "Kumar Sanu", duration: 390, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/c8/0a/fd/c80afd7e-c03a-21be-a733-d5e3f3de746f/cover.jpg/400x400bb.jpg", durationStr: "" },
  { id: "i1IsLVz6T9Q", title: "Kumar Sanu & Sadhana Sargam Live Sydney", artist: "Chintan Ramola", duration: 179, cover: "https://i.ytimg.com/vi/i1IsLVz6T9Q/hqdefault.jpg", durationStr: "" },
  { id: "bga_0ziOOfQ", title: "Woh Meri Neend Mera Chain", artist: "Sadhana Sargam", duration: 297, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/04/51/79/0451791d-9be5-85b1-601e-835f45efc6af/8901854010080.jpg/400x400bb.jpg", durationStr: "" },
  { id: "g3ddCx2Uawo", title: "Dil Hai Ki Manta Nahin", artist: "Anuradha Paudwal & Kumar Sanu", duration: 371, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/6d/9f/97/6d9f97f2-d285-93d8-6f47-8edd0b17b173/8902894105880_cover.jpg/400x400bb.jpg", durationStr: "" },
  { id: "QjqKXFGM3eI", title: "Chori Chori Dil Tera", artist: "Kumar Sanu & Sujata Goswamy", duration: 413, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/ee/01/81/ee0181b3-d51c-8346-51c0-0bee1e99b547/8905574861496.jpg/400x400bb.jpg", durationStr: "" },
  { id: "Y-o8NQ8Y36A", title: "Is Tarah Aashiqui Ka (Kumar Sanu Version)", artist: "Kumar Sanu", duration: 469, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/89/d7/35/89d735a0-bdf2-44d9-e017-1535376e51d2/8901854006458.jpg/400x400bb.jpg", durationStr: "" },
  { id: "qGOTe3KmCdY", title: "Kitna Haseen Chehra (From \"Dilwale\")", artist: "Kumar Sanu", duration: 365, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/4c/e4/30/4ce43035-5178-40e5-0557-a3ddf252199a/cover.jpg/400x400bb.jpg", durationStr: "" },
  { id: "9f6GhUb-WdM", title: "Dil Cheer Ke Dekh", artist: "Kumar Sanu", duration: 287, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/64/d3/7c/64d37cf6-4da6-6e16-6e39-cd9a5bb5e292/8901854011056.jpg/400x400bb.jpg", durationStr: "" },
  { id: "E4HtYArLiwc", title: "Pucho Zara Pucho", artist: "Alka Yagnik & Kumar Sanu", duration: 460, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/66/eb/c5/66ebc542-d478-fe57-a29f-a399f8f674ab/8901854008629.jpg/400x400bb.jpg", durationStr: "" },
  { id: "d5ZrSe1eDDU", title: "Woh Ladki Bahut Yaad Aati Hai (Lo Fi Remix)", artist: "Kumar Sanu & Alka Yagnik", duration: 450, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/d4/a4/fa/d4a4fa3e-220b-c165-c515-1a510fe08332/cover.jpg/400x400bb.jpg", durationStr: "" },
  { id: "1jjDs69WWUQ", title: "Lal Dupatta", artist: "Kanchan Nagar & Raju Punjabi", duration: 299, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/25/9f/3d/259f3d06-cc8f-f593-1a06-519d36669562/199538550429.jpg/400x400bb.jpg", durationStr: "" },
  { id: "PlN6oP-Nlno", title: "Sona Kitna Sona Hai", artist: "Udit Narayan & Poornima", duration: 279, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/69/1d/9d/691d9d96-a79f-09c3-9c7b-2b1821af5718/8901854009985.jpg/400x400bb.jpg", durationStr: "" },
  { id: "SF_cCyz6QQg", title: "Humko Deewana Kar Gaye", artist: "Sonu Nigam & Tulsi Kumar", duration: 383, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music20/v4/57/28/7e/57287e9e-6e95-fb20-8f30-f3cd3573faae/8902894120722_cover.jpg/400x400bb.jpg", durationStr: "" },
  { id: "_YjSmLlmqLM", title: "Aisi Deewangi", artist: "Alka Yagnik & Vinod Rathod", duration: 446, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/c8/0a/fd/c80afd7e-c03a-21be-a733-d5e3f3de746f/cover.jpg/400x400bb.jpg", durationStr: "" },
  { id: "eVnG_Rqfgg4", title: "Neele Neele Ambar Par (From \"Kalaakaar\")", artist: "Kalyanji-Anandji & Kishore Kumar", duration: 235, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music62/v4/9a/b5/29/9ab529af-8d90-e11b-10ff-ec10949ba0bb/886446012964.jpg/400x400bb.jpg", durationStr: "" },
  { id: "mW4WRtL6GxM", title: "Is Pyar Se Meri Taraf Na Dekho (Male Version)", artist: "Kumar Sanu", duration: 310, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/96/fa/87/96fa87b2-65e5-5fc1-1c8a-bff155e06bee/8901854009336.jpg/400x400bb.jpg", durationStr: "" },
  { id: "uIOrAkrjwp4", title: "Hum Yaar Hai Tumhare", artist: "Udit Narayan & Alka Yagnik", duration: 431, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/22/9c/fa/229cfae1-2121-bf0c-c72e-4756c321451d/8901854006410.jpg/400x400bb.jpg", durationStr: "" },
  { id: "5y_TCKNzAMI", title: "Tumse Milne Ko Dil Karta Hai", artist: "Vik4s M", duration: 279, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/e7/a3/a6/e7a3a68d-9cd9-63aa-1201-7d75f7b970fe/7300349313063.jpg/400x400bb.jpg", durationStr: "" },
  { id: "cBwl6qKrZd0", title: "Ab Tere Dil Mein To", artist: "Kumar Sanu & Alka Yagnik", duration: 505, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/c4/46/5a/c4465a14-e2a9-5c3a-6941-61e776f18c0b/191773221508.jpg/400x400bb.jpg", durationStr: "" },
  { id: "BaAoZA0fup0", title: "Dil Ka Aalam", artist: "Kumar Sanu", duration: 255, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/0a/3a/df/0a3adfc7-66f2-b2a8-df6e-850a09cd4a1e/8902894684088_cover.jpg/400x400bb.jpg", durationStr: "" },
  { id: "nNhv8A_rJTg", title: "Oye Raju Pyar Na Kariyo", artist: "Amjad Ali", duration: 353, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/1e/bf/f0/1ebff044-5643-b85e-cad8-12e325b4ce0f/artwork.jpg/400x400bb.jpg", durationStr: "" },
  { id: "s1NLjpj3aP4", title: "Jaa Bewafa Jaa", artist: "Altaf Raja", duration: 269, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/a2/01/0b/a2010bc7-591a-e991-b592-1b7d95007fab/cover.jpg/400x400bb.jpg", durationStr: "" },
  { id: "u4NSsEIny1c", title: "Muje Pine ka Shauk Nahi", artist: "Bolly HD Songs", duration: 287, cover: "https://i.ytimg.com/vi/u4NSsEIny1c/hqdefault.jpg", durationStr: "" },
  { id: "RjJxWRFfG3s", title: "Nahin Yeh Ho Nahin Sakta (From \"Barsaat\")", artist: "Kumar Sanu & Sadhana Sargam", duration: 382, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/0c/e8/3f/0ce83f8d-1fd1-f968-fcc5-ff9c974fd5fa/8901854096251.jpg/400x400bb.jpg", durationStr: "" },
  { id: "rrzSZ0NMID4", title: "Barsaat Ke Mausam Mein", artist: "Kumar Sanu & Roop Kumar Rathod", duration: 326, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/fd/db/f2/fddbf2c4-ccb5-94eb-293e-df79060e0fa8/8901854010769.jpg/400x400bb.jpg", durationStr: "" },
  { id: "1ziaNhD9xqE", title: "Meri Mehbooba", artist: "Kumar Sanu & Alka Yagnik", duration: 449, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/f0/86/e0/f086e0b3-4b4c-f513-afd3-6e6ae9f6715e/8901854004386.jpg/400x400bb.jpg", durationStr: "" },
  { id: "UCsW7nea7sI", title: "Ae Mere Humsafar", artist: "Alka Yagnik & Udit Narayan", duration: 402, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/97/38/6b/97386bc1-46b7-0c82-d28e-1621c7001c03/8902894873307_cover.jpg/400x400bb.jpg", durationStr: "" },
  { id: "5dWbn_qER3s", title: "Tere Dar Par Sanam (Male Version)", artist: "Kumar Sanu", duration: 389, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/ef/2c/59/ef2c5936-c83e-fed2-2321-dd06d16dccb7/8901854008643.jpg/400x400bb.jpg", durationStr: "" },
  { id: "HIr_kpG4Fnc", title: "S. P. Balasubrahmanyam sings Tumse Milne Ki Tamanna Hai", artist: "Hemantkumar Mahale", duration: 347, cover: "https://i.ytimg.com/vi/HIr_kpG4Fnc/hqdefault.jpg", durationStr: "" },
  { id: "XR7qvTgQ19o", title: "Taaron Ka Chamakta Hum Tumhare Hain Sanam", artist: "T-Series", duration: 361, cover: "https://i.ytimg.com/vi/XR7qvTgQ19o/hqdefault.jpg", durationStr: "" },
  { id: "jEL02Nz7Dds", title: "Dono Hi Mohabbat Ke", artist: "Altaf Raja", duration: 535, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/87/5f/ca/875fcaaa-d6e0-932f-a9da-4a492a8f893e/cover.jpg/400x400bb.jpg", durationStr: "" },
  { id: "mocKoIhNJxk", title: "Ding Dong Dole", artist: "KuTuB", duration: 403, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/4a/9b/ff/4a9bff84-9b05-d481-b278-5ef5de6e322c/195375079420.png/400x400bb.jpg", durationStr: "" },
  { id: "Tx7YCSTJC6I", title: "Dheere Dheere Tere Bina", artist: "T-Series", duration: 272, cover: "https://i.ytimg.com/vi/Tx7YCSTJC6I/hqdefault.jpg", durationStr: "" },
  { id: "jD3SGW0NHY0", title: "Kumar Sanu 90's Hits", artist: "Shemaroo Filmi Gaane", duration: 373, cover: "https://i.ytimg.com/vi/jD3SGW0NHY0/hqdefault.jpg", durationStr: "" },
  { id: "0A2ue4lNMzo", title: "Wafa Na Raas Aayee Tujhe O Harjaee (From \"Bewafa Sanam\")", artist: "Nitin Mukesh", duration: 366, cover: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/49/24/0a/49240a1f-219a-82d3-fa93-3cd6d36eb08d/8903431717023_cover.jpg/400x400bb.jpg", durationStr: "" },
  { id: "s4slgbuwOfw", title: "O Dil Tod Ke Hansti Ho Mera Remix", artist: "Pop Chartbusters", duration: 280, cover: "https://i.ytimg.com/vi/s4slgbuwOfw/hqdefault.jpg", durationStr: "" },
].map((t) => ({ ...t, durationStr: fmt(t.duration) }));

export const themes: Theme[] = [
  {
    id: "raju-mistri",
    name: "Raju Mistri",
    audioSource: "mp3",
    playerStyle: "glass-pill",
    background: `url(${RM_BASE}/assets/background-dmaY_B2e.png)`,
    tracks: rajuMistriTracks,
  },
  {
    id: "truck-wala",
    name: "Truck Wala",
    audioSource: "youtube",
    playerStyle: "truck-disc",
    background: "url(/assets/bg-1.jpg)",
    bgLayers: ["/assets/bg-1.jpg", "/assets/bg-2.jpg"],
    fontFamily: "'Baloo 2', sans-serif",
    tracks: truckWalaTracks,
  },
];
