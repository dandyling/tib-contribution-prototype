import { Book } from "../types";

const defaultBooks: Book[] = [
  {
    id: "1",
    title: "Ruhi Book 1",
    author: "Ruhi Institute",
    price: 5,
    category: "Ruhi Book (EN)",
    image:
      "https://firebasestorage.googleapis.com/v0/b/training-institute-01.appspot.com/o/fsutZVlIx0gu9R2ttb9y-Ruhi%20-%20Book%201-ZNqEhg9qc5LX9C6JAa6j-img?alt=media&token=e45230b7-d4ce-46d2-841f-2b356b1e3187",
    inventory: 48,
  },
  {
    id: "2",
    title: "Ruhi Book 2",
    author: "Ruhi Institute",
    price: 5,
    category: "Ruhi Book (EN)",
    image:
      "https://firebasestorage.googleapis.com/v0/b/training-institute-01.appspot.com/o/fsutZVlIx0gu9R2ttb9y-Ruhi%20-%20Book%202-A1kFqx2zni4Bo3K1QvOH-img?alt=media&token=80372479-03f7-434f-9aea-6384edb5f56c",
    inventory: 48,
  },
  {
    id: "3",
    title: "Ruhi Book 3",
    author: "Ruhi Institute",
    price: 5,
    category: "Ruhi Book (EN)",
    image:
      "https://firebasestorage.googleapis.com/v0/b/training-institute-01.appspot.com/o/fsutZVlIx0gu9R2ttb9y-Ruhi%20-%20Book%203%20G1-NEgHo1bJakNAdUcm6taN-img?alt=media&token=c288d1a3-bdf8-4a2a-910e-471600d55df4",
    inventory: 42,
  },
  {
    id: "4",
    title: "Ruhi Book 4",
    author: "Ruhi Institute",
    price: 5,
    category: "Ruhi Book (EN)",
    image:
      "https://firebasestorage.googleapis.com/v0/b/training-institute-01.appspot.com/o/fsutZVlIx0gu9R2ttb9y-Ruhi%20-%20Book%204%20-AmoEHr3jSSS5l3SiWk8T-img?alt=media&token=4d136cea-bf1a-4c62-9885-0c67a9077942",
    inventory: 70,
  },
  {
    id: "5",
    title: "Ruhi Book 5",
    author: "Ruhi Institute",
    price: 5,
    category: "Ruhi Book (EN)",
    image:
      "https://firebasestorage.googleapis.com/v0/b/training-institute-01.appspot.com/o/fsutZVlIx0gu9R2ttb9y-Ruhi%20-%20Book%205%20-2E1dxbxmpV3a1uMRK2w2-img?alt=media&token=bfc08334-0061-4422-93bf-abc1a10d2f30",
    inventory: 44,
  },
  {
    id: "6",
    title: "Ruhi Book 6",
    author: "Ruhi Institute",
    price: 5,
    category: "Ruhi Book (EN)",
    image:
      "https://firebasestorage.googleapis.com/v0/b/training-institute-01.appspot.com/o/fsutZVlIx0gu9R2ttb9y-Ruhi%20-%20Book%206%20-8T5haS5LXuNdjPDcp6zp-img?alt=media&token=1b8df895-613d-4927-8298-dd969357cc48",
    inventory: 81,
  },
  {
    id: "7",
    title: "Ruhi Book 1",
    author: "Ruhi Institute",
    price: 5,
    category: "Ruhi Book (BM)",
    image:
      "https://firebasestorage.googleapis.com/v0/b/training-institute-01.appspot.com/o/Aky6ZRxDoGT8AJ6pYHXT-Ruhi%20-%20Book%201-ZcMvGYXJLq2SOZ45Vw3a-img?alt=media&token=7a10072e-394b-4a95-910e-36e227e8a658",
    inventory: 86,
  },
];

// Initialize books in localStorage if they don't exist
if (!localStorage.getItem("books")) {
  localStorage.setItem("books", JSON.stringify(defaultBooks));
}

// Export books from localStorage
// export const books: Book[] = JSON.parse(
//   localStorage.getItem("books") || JSON.stringify(defaultBooks)
// );
export const books: Book[] = JSON.parse(JSON.stringify(defaultBooks));
