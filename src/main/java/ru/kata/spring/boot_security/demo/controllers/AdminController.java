package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entities.Role;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.service.RoleServiceImpl;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.util.Collection;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserServiceImpl userService;
    private final RoleServiceImpl roleService;

    public AdminController(UserServiceImpl userService, RoleServiceImpl roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping
    public String printUsers(Model model) {
        model.addAttribute("users", userService.getListUsers());
        return "users";
    }

    @GetMapping("/addNewUser")
    public String addNewUser(User user, Model model) {
        model.addAttribute("user", user);
        model.addAttribute("roles", roleService.getRoleList());
        return "new-user";
    }

    @PostMapping("/saveUser")
    public String saveUser(@ModelAttribute("user") User user, @RequestParam("role") List<String> role){
        Collection<Role> roleList = roleService.getSetOfRoles(role);
        user.setRoles(roleList);
        userService.addUser(user);
        return "redirect:/admin";
    }

    @RequestMapping("/updateUser/{id}")
    public String updateUser(@PathVariable("id") long userId, Model model) {
        model.addAttribute("user", userService.getUserById(userId));
        model.addAttribute("roles", roleService.getRoleList());
        return "user-info";
    }

    @RequestMapping("/deleteUser/{id}")
    public String deleteUser(@PathVariable("id") long userId) {
        userService.deleteUserById(userId);
        return "redirect:/admin";
    }
}
