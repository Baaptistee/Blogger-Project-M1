import {Component, OnInit} from "@angular/core";
import {Post} from '../../data/post';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  standalone: false
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe(posts => {
      this.posts = posts.sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime());
    });
  }
}

