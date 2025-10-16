import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { User } from './user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  users: User[] = [];
  selectedUser: User = {} as User;

  constructor(private userService: UserService) {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => this.users = data);
  }

  addUser() {
    this.userService.createUser(this.selectedUser).subscribe(() => {
      this.loadUsers();
      this.clearForm();
    });
  }

  updateUser() {
    if (this.selectedUser.userId) {
      this.userService.updateUser(this.selectedUser.userId, this.selectedUser)
        .subscribe(() => {
          this.loadUsers();
          this.clearForm();
        });
    }
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => this.loadUsers());
  }

  editUser(user: User) {
    this.selectedUser = { ...user };
  }

  clearForm() {
    this.selectedUser = {} as User;
  }
}
