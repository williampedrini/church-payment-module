package br.com.payment.management.core.report.service;

import br.com.payment.management.core.report.enumerable.GeneratorType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.NoSuchElementException;

/**
 * The Factory responsible for centralizing the creation of all the existing implementations for {@link ReportGeneratorService}.
 *
 * @author William Custodio
 */
@Component
public class ReportGeneratorFactory {

    private List<ReportGeneratorService> documentGeneratorServices;

    @Autowired
    public ReportGeneratorFactory(final List<ReportGeneratorService> documentGeneratorServices) {
        this.documentGeneratorServices = documentGeneratorServices;
    }

    /**
     * Get a certain {@link ReportGeneratorService} based on the type of the generation.
     * @return The found document generator service.
     */
    public ReportGeneratorService getDocumentGeneratorService(final GeneratorType type) {
        return documentGeneratorServices.stream()
                .filter((service)-> type.equals(service.getType())).findFirst()
                .orElseThrow(() -> new NoSuchElementException(String.format("No service implementation found for the type %s", type.name())));
    }
}