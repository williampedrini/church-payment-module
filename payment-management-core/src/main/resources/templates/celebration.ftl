<html>
    <head>
        <title>Comemorações</title>
    </head>
    <body>
        <table cellpadding="5" style="border-collapse: collapse; table-layout: auto;  width: 100%;">
            <tr>
                <td><img src="images/logo.png"/></td>
                <td>
                    <h1>
                        <#if criteria.celebration == "MARRIAGE">
                            Casamentos
                        <#elseif criteria.celebration == "BIRTHDAY">
                            Aniversários
                        </#if>
                    </h1>
                    <h2>${criteria.beginDate.format('dd/MM/yyyy')} - ${criteria.endDate.format('dd/MM/yyyy')}</h2>
                </td>
            </tr>
        </table>
        <br/>
        <table cellpadding="5" style="border-collapse: collapse; border: 1px solid black; table-layout: auto;  width: 100%;">
            <tr style="border: 1px solid black;">
                <th style="border: 1px solid black;">Nome</th>
                <th style="border: 1px solid black;">Data</th>
            </tr>
            <#foreach celebration in celebrations>
                <tr style="border: 1px solid black;">
                    <td style="border: 1px solid black;">
                        ${celebration.contributor.name}
                    </td>
                    <td style="border: 1px solid black;">
                        ${celebration.date.format('dd/MM/yyyy')}
                    </td>
                </tr>
            </#foreach>
        </table>
    </body>
</html>