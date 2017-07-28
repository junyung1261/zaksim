import { NgModule, Component, Input, OnInit, OnChanges} from '@angular/core';

import { CommunityProvider } from '../../providers/community/community';
import { UserProvider } from '../../providers/user/user';
import { AngularFireAuth  } from 'angularfire2/auth';
import { AngularFireDatabase  } from 'angularfire2/database';

@Component({
    selector: 'comp-post',
    templateUrl: 'post.html'
})

export class PostCmp {
    @Input() feed;
    post;
    poster;
    private user: any;
    constructor(public communityProvider:CommunityProvider, 
                private userProvider: UserProvider,
                public afAuth: AngularFireAuth,
                public afDB: AngularFireDatabase) {
    this.user = this.afAuth.auth.currentUser.uid;
    
    }

    ngOnInit() {
        let postID = this.feed.$key;
        this.post = this.communityProvider.getPost(postID);
       
        this.post
        .subscribe(value => {
            this.poster = this.communityProvider.getUser(value.from);
        });
    }


}