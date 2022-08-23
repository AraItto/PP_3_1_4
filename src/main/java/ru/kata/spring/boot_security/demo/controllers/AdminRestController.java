package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AdminRestController {

    private final UserServiceImpl userService;

    public AdminRestController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping("/admin")
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.getListUsers(),HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<UserDetails> userView(@AuthenticationPrincipal UserDetails currentUser) {
        return new ResponseEntity<>(userService.loadUserByUsername(currentUser.getUsername()),HttpStatus.OK);
    }

    @PostMapping("/admin")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        userService.addUser(user);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }

    @PatchMapping("/admin/{id}")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        userService.updateUser(user);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Long> deleteUser(@PathVariable long id) {
        userService.deleteUserById(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }
}
