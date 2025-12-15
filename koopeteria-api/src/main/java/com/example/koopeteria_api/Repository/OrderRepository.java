package com.example.koopeteria_api.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.koopeteria_api.Model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>{

}
