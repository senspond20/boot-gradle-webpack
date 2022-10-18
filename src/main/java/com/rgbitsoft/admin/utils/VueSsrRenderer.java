package com.rgbitsoft.admin.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.script.*;
import java.io.*;
import java.nio.file.Path;
import java.nio.file.Paths;

@Slf4j
@Component
public class VueSsrRenderer {

//    private static final String VUE_RENDERER = System.getProperty("user.dir") + "/node_modules/vue-server-renderer/";
    private static final String VUE_RENDERER = System.getProperty("user.dir") + "/src/main/resources/vue-server-renderer/";

    private ScriptEngine getEngine() {
        return new ScriptEngineManager().getEngineByName("graal.js");
    }

    private ScriptContext getContext() {
        return new SimpleScriptContext();
    }

    /**
     * @param route
     * @return
     * @throws ScriptException
     * @throws IOException
     */
    public String render(String route) throws ScriptException, IOException {

        ScriptEngine engine = getEngine();
        ScriptContext context = getContext();
        Bindings engineScope = engineSetting(engine, context);
//        log.info("> SSR - url : {} " , route);
//        log.info("enginScope  : {}", engineScope);
        engineScope.put("rendered", null);             // Global variable declaration
        engineScope.put("route", route);                     // Global variable declaration

        engineScope.put("word", "word");
        engine.eval(read("static/vue/server.bundle.js"), context);

        return context.getAttribute("rendered").toString();  // Get rendered variable to String type
    }

    /**
     * @param engine
     * @param context
     * @return
     * @throws ScriptException
     * @throws IOException
     */
    private Bindings engineSetting(ScriptEngine engine, ScriptContext context) throws ScriptException, IOException {
        context.setBindings(engine.createBindings(), ScriptContext.ENGINE_SCOPE);
        Bindings engineScope = context.getBindings(ScriptContext.ENGINE_SCOPE);
        engine.setContext(context);
        engine.eval("var process = { env: { VUE_ENV: 'server', NODE_ENV: 'production' }}; this.global = { process: process };",                context);
        loadFiles(engine, context);// vue-server-Loading renderer
        return engineScope;
    }

    /**
     * @param engine
     * @param context
     * @throws IOException
     * @throws ScriptException
     */
    private void loadFiles(ScriptEngine engine, ScriptContext context) throws IOException, ScriptException {
        Path path = Paths.get(VUE_RENDERER);
        Path file = path.resolve("basic.js");

        System.out.println(file);

        Resource resource = new UrlResource(file.toUri());
        if (resource.exists() || resource.isReadable()) {
            System.out.println("true");
            InputStream in = resource.getInputStream();
            String all = all(new BufferedReader(new InputStreamReader(in)));
            engine.eval(all, context);
        }
    }

    private String all(BufferedReader reader) throws IOException {
        StringBuilder builder = new StringBuilder();
        String string;

        string = reader.readLine();
        while (string != null){
            builder.append(string + System.getProperty("line.separator"));
            string = reader.readLine();
        }
        return builder.toString();
    }

    private Reader read(String path) {
        InputStream in = getClass().getClassLoader().getResourceAsStream(path);
        return new InputStreamReader(in);
    }
}
