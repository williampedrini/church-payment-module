<html>
    <head>
        <title>Contribuições</title>
    </head>
    <body>
        <table cellpadding="5" style="border-collapse: collapse; table-layout: auto;  width: 100%;">
            <tr>
                <td><img src="images/logo.png"/></td>
                <td><h1>Contribuições</h1></td>
            </tr>
        </table>
        <br/>
        <table cellpadding="5" style="border-collapse: collapse; table-layout: auto;  width: 100%;">
            <tr>
                <th>Nome</th>
                <th>Data Nascimento</th>
            </tr>
            <tr>
                <td>
                    <#if contributor.name??>
                        ${contributor.name}
                    </#if>
                    </td>
                <td>
                    <#if contributor.birthDate??>
                        ${contributor.birthDate.format('dd/MM/yyyy')}
                    </#if>
                </td>
            </tr>
            <tr>
                <th>Estado Civil</th>
                <th>Nome Cônjuge</th>
            </tr>
            <tr>
                <td>
                    <#if contributor.civilState == "MARRIED">
                        Casado(a)
                    <#elseif contributor.civilState == "DIVORCED" >
                        Divorciado(a)
                    <#elseif contributor.civilState == "SINGLE" >
                        Solteiro(a)
                    <#elseif contributor.civilState == "STABLE_UNION" >
                        União Estável
                    <#elseif contributor.civilState == "WIDOWER" >
                        Viúvo(a)
                    </#if>
                </td>
                <td>
                    <#if contributor.partnerName??>
                        ${contributor.partnerName}
                    </#if>
                </td>
            </tr>
            <tr>
                <th>Data Casamento</th>
                <th>Endereço</th>
            </tr>
            <tr>
                <td>
                    <#if contributor.marriageDate??>
                        ${contributor.marriageDate.format('dd/MM/yyyy')}
                    </#if>
                </td>
                <td>
                    <#if contributor.address??>
                        ${contributor.address}
                    </#if>
                </td>
            </tr>
            <tr>
                <th>Telefone</th>
                <th>Celular</th>
            </tr>
            <tr>
                <td>
                    <#if contributor.telephone??>
                        ${contributor.telephone?c}
                    </#if>
                </td>
                <td>
                    <#if contributor.cellphone??>
                        ${contributor.cellphone?c}
                    </#if>
                </td>
            </tr>
        </table>
        <br/>
        <table cellpadding="5" style="border-collapse: collapse; border: 1px solid black; table-layout: auto;  width: 100%;">
            <tr style="border: 1px solid black;">
                <th style="border: 1px solid black;">Nome</th>
                <th style="border: 1px solid black;">Período</th>
                <th style="border: 1px solid black;">Total</th>
            </tr>
            <#foreach contribution in contributions>
                <tr style="border: 1px solid black;">
                    <td style="border: 1px solid black;">${contribution.campaign}</td>
                    <td style="border: 1px solid black;">${contribution.period}</td>
                    <td style="border: 1px solid black;">R$ ${contribution.total/100}</td>
                </tr>
            </#foreach>
        </table>
    </body>
</html>