package br.com.payment.management.webapp.contributor.controller;

import br.com.payment.management.core.contributor.model.Contributor;
import br.com.payment.management.core.contributor.model.Criteria;
import br.com.payment.management.core.contributor.service.ContributorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/contributors")
public class ContributorController {

    private final ContributorService contributorService;

    @Autowired
    public ContributorController(ContributorService contributorService) {
        this.contributorService = contributorService;
    }

    @GetMapping(path = "/search/findAll")
    public List<Contributor> findAll(final Criteria criteria) {
        return this.contributorService.findAll(criteria);
    }
}