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
        <table cellpadding="5" style="border-collapse: collapse; border: 1px solid black; table-layout: auto;  width: 100%;">
            <tr style="border: 1px solid black;">
                <th style="border: 1px solid black;">Nome Contribuinte</th>
                <th style="border: 1px solid black;">Campanha</th>
                <th style="border: 1px solid black;">Data Lançamento</th>
                <th style="border: 1px solid black;">Valor</th>
            </tr>
            <#foreach contribution in contributions>
                <tr style="border: 1px solid black;">
                    <td style="border: 1px solid black;">${contribution.contributor.name}</td>
                    <td style="border: 1px solid black;">${contribution.campaign.name}</td>
                    <td style="border: 1px solid black;">${contribution.creationDate.format('dd/MM/yyyy')}</td>
                    <td style="border: 1px solid black;">R$ ${contribution.amount/100}</td>
                </tr>
            </#foreach>
        </table>
    </body>
</html>