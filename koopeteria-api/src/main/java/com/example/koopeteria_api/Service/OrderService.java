package com.example.koopeteria_api.Service;

import java.util.List;

import com.example.koopeteria_api.DTO.BillResponse;
import com.example.koopeteria_api.DTO.OrderRequest;
import com.example.koopeteria_api.Model.Order;

public interface OrderService {
    Order addOrder(OrderRequest order);
    List<Order> getAllOrders();
    Order getOrderById(Long id);
    void deleteOrder(Long id);
    Order updateOrder(Long id, OrderRequest order);
    BillResponse generateBill();

}
