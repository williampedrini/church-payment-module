package br.com.payment.management.core.report.service;

import br.com.payment.management.core.calculator.service.CalculatorService;
import br.com.payment.management.core.report.enumerable.GeneratorType;
import br.com.payment.management.core.report.model.Criteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Map;

/**
 * A service responsible for handling the generation of a file based on the 'campaign.ftl' template.
 *
 * @author William Custodio
 */
@Service("campaignReportGeneratorService")
class CampaignReportGeneratorService extends ReportGeneratorService {

    private CalculatorService calculatorService;

    @Autowired
    public CampaignReportGeneratorService(final CalculatorService calculatorService) {
        this.calculatorService = calculatorService;
    }

    @Override
    GeneratorType getType() {
        return GeneratorType.CAMPAIGN;
    }

    @Override
    Map<String, Object> getData(final Criteria criteria) {
        return Collections.singletonMap("calculations", this.calculatorService.getCalculationByMonthAndYear());
    }

    @Override
    String getDefaultFileName(final Criteria criteria) {
        return String.format("lamcamentos_%s.pdf", LocalDateTime.now().format(ReportGeneratorService.DATE_TIME_FORMATTER));
    }
}