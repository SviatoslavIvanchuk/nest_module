import { Injectable } from '@nestjs/common';
import { Prisma, Post } from '@prisma/client';

import { PrismaService } from '../core/prisma.service';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  getAll(): Promise<Post[]> {
    return this.prismaService.post.findMany();
  }

  getById(postId: string): Promise<Post> {
    return this.prismaService.post.findUnique({
      where: { id: Number(postId) },
    });
  }

  createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prismaService.post.create({ data });
  }
}
