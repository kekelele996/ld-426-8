export interface MoodBoard {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  coverImageUrl: string;
  coverImageId?: string;
  imageIds: string[];
  tags: string[];
}
