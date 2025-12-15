package com.example.koopeteria_api.DTO;

import lombok.Data;

@Data
public class BillResponse {
    private Double regularBillTotal;
    private Double discountedBillTotal;
}
