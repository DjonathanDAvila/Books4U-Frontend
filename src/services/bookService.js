import axios from "axios";

const API_URL = "http://localhost:8080";

export const bookService = {
  async getGenres() {
    const response = await axios.get(`${API_URL}/genre/`);
    return response.data;
  },

  async getPublishers() {
    const response = await axios.get(`${API_URL}/publisher/`);
    return response.data;
  },

  async getBookLocalizations() {
    const response = await axios.get(`${API_URL}/bookLocalization/`);
    return response.data.map((loc) => ({
      id: loc.id,
      name: `Bookcase: ${loc.bookcase}, Shelf: ${loc.shelf}`,
    }));
  },

  async getAuthors() {
    const response = await axios.get(`${API_URL}/author/`);
    return response.data;
  },

  async saveBook(book) {
    const response = await axios.post(`${API_URL}/book`, book);
    return response.data;
  },

  async searchBooks(searchParams) {
    const response = await axios.get(`${API_URL}/book/`, { params: searchParams });
    return response.data;
  },

  async deleteBook(bookId) {
    await axios.delete(`${API_URL}/book/${bookId}`);
  },

  async getBook(bookId) {
    const response = await axios.get(`${API_URL}/book/${bookId}`);
    return response.data;
  },

  async updateBook(book) {
    const response = await axios.put(`${API_URL}/book/${book.id}`, book);
    return response.data;
  },
};
