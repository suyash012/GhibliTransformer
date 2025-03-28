import { users, type User, type InsertUser, type Image, type InsertImage } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Image storage methods
  getImage(id: number): Promise<Image | undefined>;
  createImage(image: InsertImage & { createdAt: string }): Promise<Image>;
  updateImage(id: number, image: Partial<Image>): Promise<Image>;
  deleteImage(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private images: Map<number, Image>;
  currentUserId: number;
  currentImageId: number;

  constructor() {
    this.users = new Map();
    this.images = new Map();
    this.currentUserId = 1;
    this.currentImageId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getImage(id: number): Promise<Image | undefined> {
    return this.images.get(id);
  }

  async createImage(image: InsertImage & { createdAt: string }): Promise<Image> {
    const id = this.currentImageId++;
    const newImage: Image = { 
      ...image, 
      id,
      status: "pending",
      processedPath: null
    };
    this.images.set(id, newImage);
    return newImage;
  }

  async updateImage(id: number, updates: Partial<Image>): Promise<Image> {
    const image = this.images.get(id);
    if (!image) {
      throw new Error(`Image with id ${id} not found`);
    }
    
    const updatedImage = { ...image, ...updates };
    this.images.set(id, updatedImage);
    return updatedImage;
  }

  async deleteImage(id: number): Promise<boolean> {
    return this.images.delete(id);
  }
}

export const storage = new MemStorage();
