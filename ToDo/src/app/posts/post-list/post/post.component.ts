import { Component, Input, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../../shared/post.model';
import { AuthService } from '../../../auth/auth.service';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
	selector: 'post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {
	@Input() post: Post;
	@Input() userId: string;
	postDeleteSubscription: Subscription;
	isEditMode = false;
    isLoading = false;
    deadlineIsNear: boolean;   
    deadlineHasCome: boolean;   
    deadlineIsFar: boolean;   

    constructor(private authService: AuthService) {}
    
    ngOnInit(){
        const postDeadlineDate = new Date(this.post.deadlineDate).getTime();

        const weekLater = new Date();
        weekLater.setDate(weekLater.getDate() + 7);
        
        this.deadlineIsFar = weekLater.getTime() <= postDeadlineDate;
        this.deadlineIsNear = weekLater.getTime() >= postDeadlineDate;
        this.deadlineHasCome = new Date().getTime() >= postDeadlineDate;
    }

	onEdit() {
		this.isEditMode = true;
	}

	onDelete() {
		this.isLoading = true;
		this.postDeleteSubscription = this.authService
			.deletePost(this.userId, this.post.id)
			.pipe(
				finalize(() => {
					this.isLoading = false;
				})
			)
			.subscribe(function () {
				console.log('Post has been deleted');
			});
	}

	onPostUpdated() {
		this.isEditMode = false;
	}

	ngOnDestroy() {
		if (this.postDeleteSubscription) {
			this.postDeleteSubscription.unsubscribe;
		}
	}
}
