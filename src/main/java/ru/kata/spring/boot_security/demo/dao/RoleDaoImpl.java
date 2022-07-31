package ru.kata.spring.boot_security.demo.dao;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.entities.Role;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Collection;

@Repository
public class RoleDaoImpl implements RoleDao{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Role getRoleById(long id) {
        return entityManager.find(Role.class, id);
    }

    @Override
    public Collection<Role> getRoleList() {
        Query query=entityManager.unwrap(Session.class).createQuery("from Role");
        return query.getResultList();
    }
}
