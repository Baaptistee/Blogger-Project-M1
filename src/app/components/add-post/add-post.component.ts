import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Category } from '../../data/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  standalone: false
})
export class AddPostComponent {
  postForm: FormGroup;
  categories: Category[] = []; // Liste des catégories

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private categoryService: CategoryService
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: [null, Validators.required], // Accepte un objet Category
    });

    // Charger les catégories
    this.categoryService.getAll().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      const postData = {
        ...this.postForm.value,
        createdDate: new Date().toISOString(),
      };
      console.log('Données envoyées :', postData);
      this.postService.create(postData).subscribe({
        next: (post) => {
          console.log('Post créé avec succès :', post);
          alert('Post créé avec succès !');
        },
        error: (err) => {
          console.error('Erreur lors de la création du post :', err);
          alert('Erreur lors de la création du post.');
        },
      });
    }
  }
}

