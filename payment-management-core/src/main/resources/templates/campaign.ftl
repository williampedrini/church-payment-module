<html>
    <head>
        <title>Campanhas</title>
    </head>
    <body>
        <table cellpadding="5" style="border-collapse: collapse; table-layout: auto;  width: 100%;">
            <tr>
                <td><img src="images/logo.png"/></td>
                <td><h1>Campanhas</h1></td>
            </tr>
        </table>
        <br/>
        <table cellpadding="5" style="border-collapse: collapse; border: 1px solid black; table-layout: auto;  width: 100%;">
            <tr style="border: 1px solid black;">
                <th style="border: 1px solid black;">Nome</th>
                <th style="border: 1px solid black;">Período</th>
                <th style="border: 1px solid black;">Total</th>
            </tr>
            <#foreach calculation in calculations>
                <tr style="border: 1px solid black;">
                    <td style="border: 1px solid black;">${calculation.campaign}</td>
                    <td style="border: 1px solid black;">${calculation.period}</td>
                    <td style="border: 1px solid black;">R$ ${calculation.total/100}</td>
                </tr>
            </#foreach>
        </table>
    </body>
</html>