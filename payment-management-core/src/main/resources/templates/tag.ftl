<html>
    <head>
        <title>Etiquetas</title>
    </head>
    <body>
        <table cellpadding="5" style="border-collapse: collapse; table-layout: auto;  width: 100%;">
            <tr>
                <td><img src="images/logo.png"/></td>
                <td><h1>Etiquetas</h1></td>
            </tr>
        </table>
        <br/>
        <#foreach contributor in contributors>
            <div style="margin: 10px; padding: 5px; border-style: dashed;">
                <label><b>${contributor.name}</b></label><br/>
                ${contributor.address}
            </div>
        </#foreach>
    </body>
</html>