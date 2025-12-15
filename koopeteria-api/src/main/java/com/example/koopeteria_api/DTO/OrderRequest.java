package com.example.koopeteria_api.DTO;

import lombok.Data;

@Data
public class OrderRequest {
    private String orderName;
    private Double price;
    private Boolean isDiscounted;
}
