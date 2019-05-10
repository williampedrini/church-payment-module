package br.com.payment.management.webapp.calculator.controller;

import br.com.payment.management.core.calculator.model.ContributionCalculation;
import br.com.payment.management.core.calculator.service.CalculatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/calculators", produces = MediaType.APPLICATION_JSON_VALUE)
public class CalculatorController {

    @Autowired
    private CalculatorService calculatorService;

    @GetMapping("/contributions")
    public List<ContributionCalculation> getCalculationByMonthAndYear() {
        return this.calculatorService.getCalculationByMonthAndYear();
    }
}